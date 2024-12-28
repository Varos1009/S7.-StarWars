import React, { useContext, useEffect } from "preact/compat";
import { useNavigate, useParams } from "react-router-dom";
import { StarshipContext } from "../context/StarshipContext";

const ShipDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { shipInfo, fetchShipDetails } = useContext(StarshipContext);

    useEffect(() => {
        fetchShipDetails(id);
    }, [id]);


    if (!shipInfo) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <h4 className="text-white">No Data Found</h4>
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex justify-content-center border border-secondary my-3">
                <h4 className="list d-flex mb-0 p-2 border border-secondary text-white"
                    type="button"
                    onClick={() => navigate("/", { state: { activeTab: 'starships' } })}>
                    Back To The List
                </h4>
            </div>

            <div className=" border border-secondary my-3">
                <h5 className="d-flex mb-0 p-2 border border-secondary text-white">
                    STARSHIP
                </h5>
            </div>
            <div className="card my-5 mx-auto bg-dark w-75">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                            className="img-fluid rounded-start w-100 h-100"
                            alt={`${shipInfo?.name} Image`}
                            onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image+Available'}
                        />
                    </div>

                    <div className="col-md-8 ">
                        <div className="card-body border-start ps-3">
                            <h3 className="card-title">{shipInfo.name}</h3>
                            <p className="card-text"><strong>Model:</strong> {shipInfo.model}</p>
                            <p className="card-text"><strong>Manufacturer:</strong> {shipInfo.manufacturer}</p>
                            <p className="card-text"><strong>Cost in credits:</strong> {shipInfo.cost}</p>
                            <p className="card-text"><strong>Crew:</strong> {shipInfo.crew}</p>
                            <p className="card-text"><strong>Passengers:</strong> {shipInfo.passengers}</p>
                            <p className="card-text"><strong>Speed:</strong> {shipInfo.speed}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-secondary my-3">
                <h5 className="d-flex mb-0 p-2 border border-secondary text-white">PILOTS</h5>
            </div>
            {shipInfo.pilots.length > 0 ? (
                <div className="d-flex flex-wrap">
                    {shipInfo.pilots.map((pilot, index) => (
                        <div key={index} className="card bg-dark text-white m-2" style={{ width: "10rem" }}>
                            <img src={pilot.image} className="card-img-top" />
                            <div className="card-body">
                                <h6 className="card-title">{pilot.name}</h6>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No Pilots Found</p>
            )}

            <div className="border border-secondary my-3">
                <h5 className="d-flex mb-0 p-2 border border-secondary text-white">FILMS</h5>
            </div>
            {shipInfo.films.length > 0 ? (
                <div className="d-flex flex-wrap">
                    {shipInfo.films.map((film, index) => (
                        <div key={index} className="card bg-dark text-white m-2" style={{ width: "10rem" }}>
                            <img src={film.image} alt={film.title} className="card-img-top" />
                            <div className="card-body">
                                <h6 className="card-title">{film.title}</h6>
                                <p className="card-text">{film.releaseDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-white">No Films Found</p>
            )}
        </div>
    );

};

export default ShipDetails;
