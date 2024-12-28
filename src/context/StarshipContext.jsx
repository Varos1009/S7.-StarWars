import React, { createContext, useState } from 'react';

export const StarshipContext = createContext();

export const StarshipProvider = ({ children }) => {
    const [starships, setStarships] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [shipInfo, setShipInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const filmImages = {
        "A New Hope": "https://starwars-visualguide.com/assets/img/films/1.jpg",
        "The Empire Strikes Back": "https://starwars-visualguide.com/assets/img/films/2.jpg",
        "Return of the Jedi": "https://starwars-visualguide.com/assets/img/films/3.jpg",
        "The Phantom Menace": "https://starwars-visualguide.com/assets/img/films/4.jpg",
        "Attack of the Clones": "https://starwars-visualguide.com/assets/img/films/5.jpg",
        "Revenge of the Sith": "https://starwars-visualguide.com/assets/img/films/6.jpg",
        "The Force Awakens": "https://starwars-visualguide.com/assets/img/films/7.jpg"
    };

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

                    const pilots = await Promise.all(
                        matchedShip.pilots.map(async (pilotUrl) => {
                            const pilotResponse = await fetch(pilotUrl);
                            const pilotData = await pilotResponse.json();
                            const pilotId = pilotUrl.split("/").filter(Boolean).pop();
                            return {
                                name: pilotData.name,
                                image: `https://starwars-visualguide.com/assets/img/characters/${pilotId}.jpg`
                            };
                        })
                    );

                    const films = await Promise.all(
                        matchedShip.films.map(async (filmUrl) => {
                            const filmResponse = await fetch(filmUrl);
                            const filmData = await filmResponse.json();
                            const image = filmImages[filmData.title];
                            if (!image) {
                                console.warn(`No image found for film: ${filmData.title}`);
                            }
                            return {
                                title: filmData.title,
                                releaseDate: filmData.release_date,
                                image: image || "https://via.placeholder.com/150?text=No+Image" // Fallback image
                            };
                        })
                    );

                    setShipInfo({
                        name: matchedShip.name,
                        model: matchedShip.model,
                        manufacturer: matchedShip.manufacturer,
                        cost: matchedShip.cost_in_credits,
                        crew: matchedShip.crew,
                        passengers: matchedShip.passengers,
                        speed: matchedShip.max_atmosphering_speed,
                        pilots: pilots.map(pilot => ({
                            name: pilot.name,
                            image: pilot.image
                        })),
                        films: films.map(film => ({
                            title: film.title,
                            releaseDate: film.releaseDate,
                            image: film.image
                        }))
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
