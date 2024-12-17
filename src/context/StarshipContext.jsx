import React, { createContext, useState} from 'react';

export const StarshipContext = createContext();

export const StarshipProvider = ({ children }) => {
    const [starships, setStarships] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [shipInfo, setShipInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch Starships Data
    const fetchStarships = async (url = "https://swapi.py4e.com/api/starships/?page=1") => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            const ships = data.results.map((ship) => ({
                id: ship.url.split('/').filter(Boolean).pop(),
                name: ship.name,
                model: ship.model,
            }));
            setStarships((prev) => {
                const uniqueShips = ships.filter((ship) => 
                    !prev.some((existingShip) => existingShip.id === ship.id)
                );
                return [...prev, ...uniqueShips];
            });
            setNextPage(data.next);
        } catch (error) {
            console.error('Error fetching starships:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch Single Ship Data
    const fetchShipDetails = async (id) => {
        setLoading(true);
        const pages = [1, 2, 3, 4];
        let shipFound = false;

        try {
            for (let page of pages) {
                if (shipFound) break;

                const response = await fetch(`https://swapi.py4e.com/api/starships/?page=${page}`);
                const data = await response.json();
                const matchedShip = data?.results?.find((ship) => {
                    const shipId = ship.url.split("/").filter(Boolean).pop();
                    return shipId === id;
                });

                if (matchedShip) {
                    setShipInfo({
                        name: matchedShip.name,
                        model: matchedShip.model,
                        manufacturer: matchedShip.manufacturer,
                        cost: matchedShip.cost_in_credits,
                        crew: matchedShip.crew,
                        passengers: matchedShip.passengers,
                        speed: matchedShip.max_atmosphering_speed,
                    });
                    shipFound = true;
                    break;
                }
            }
        } catch (error) {
            console.error('Error fetching ship details:', error);
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <StarshipContext.Provider value={{
            starships,
            nextPage,
            shipInfo,
            loading,
            fetchStarships,
            fetchShipDetails
        }}>
            {children}
        </StarshipContext.Provider>
    );
};
