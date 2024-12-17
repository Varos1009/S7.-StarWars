import React, { useState, useEffect, useContext } from 'preact/compat';
import { useNavigate } from 'react-router-dom';
import { StarshipContext } from '../context/StarshipContext';
import SwLogo from '../assets/starwars.png';
import ImageAfterIntro from '../assets/star-wars-wallpaper.jpg';

const HomePage = () => {

    const navigate = useNavigate();

    const { starships, fetchStarships, nextPage } = useContext(StarshipContext);
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'starships');
    const [showImage, setShowImage] = useState(false);


    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);


    useEffect(() => {
        if (activeTab === 'starships' && starships.length === 0) {
            fetchStarships();
        }
    }, [activeTab, fetchStarships, starships.length]);

    const handleNextPage = () => {
        if (nextPage) {
            fetchStarships(nextPage);
        }
    };

    useEffect(() => {
        if (activeTab === 'home') {
            const timeout = setTimeout(() => {
                setShowImage(true);
            }, 60000);
            return () => clearTimeout(timeout);
        } else {
            setShowImage(false);
        }
    }, [activeTab]);



    return (
        <div>
            <div className="container d-flex  justify-content-between  align-items-center mx-auto mt-3 mb-3 mb-md-1">
                <div className=" logoStar w-25 position-relative z-1" >
                    <img src={SwLogo} alt="Star Wars Logo" className="w-100" />
                </div>
                <div className="log d-flex flex-column flex-md-row justify-content-center float-end align-self-start mt-3">
                    <h5 className="log me-3 bg-black" type="button" onClick={() => navigate("/login")}>LOGIN</h5>
                    <h5 className="log bg-black" type="button" onClick={() => navigate("/register")}>SIGN UP</h5>
                </div>
            </div>
            <div className="d-flex justify-content-center border border-secondary mb-3">
                <nav>
                    <div className="nav nav-tabs" role="tablist">
                        <button
                            className={`nav-link ${activeTab === 'home' ? 'active lightBorder' : ''} bg-black border-secondary text-white rounded-0`}
                            onClick={() => setActiveTab('home')}
                        >
                            HOME
                        </button>
                        <button
                            className={`nav-link ${activeTab === 'starships' ? 'active lightBorder' : ''} bg-black border-secondary text-white rounded-0`}
                            onClick={() => setActiveTab('starships')}
                        >
                            STARSHIPS
                        </button>
                    </div>
                </nav>
            </div>

            <div className="container">
                {activeTab === 'home' && (
                    <>
                        {!showImage && (
                            <section className="star-wars">

                                <div className="crawl">

                                    <p className="text-center mb-3">STAR WARS</p>

                                    <p>
                                        A long time ago in a galaxy far, far away....

                                        It is a dark time for the galaxy. The oppressive Galactic Empire has tightened its iron grip, enslaving entire star systems and extinguishing the last sparks of hope. The Rebel Alliance, scattered and outnumbered, fights valiantly to restore peace and freedom to the cosmos.

                                        In the shadow of the dreaded DEATH STAR, a secret resistance has emerged. Bold spies and daring pilots work tirelessly to steal vital plans that could turn the tide of war. Among them is a young hero destined to rise against overwhelming odds.

                                        Meanwhile, the sinister Sith Lords, wielding the ancient power of the Dark Side, plot to crush the rebellion once and for all. Their agents spread fear and betrayal, hunting down rebels across the stars.

                                        Now, in the depths of uncharted space, a secret base shelters the last remnants of the Alliance. From here, the spark of rebellion burns brighter, as brave freedom fighters prepare to embark on a desperate mission that could decide the fate of the galaxy....

                                        The adventure begins!

                                    </p>

                                </div>

                            </section>

                        )}
                        {showImage && (
                            <div className="d-flex justify-content-center  ">
                                <img src={ImageAfterIntro} alt="After Intro" className="intro w-50 w-lg-75 " />
                            </div>
                        )}
                    </>

                )}
                {activeTab === 'starships' && (
                    <ul className="list-group bg-transparent">
                        {starships.map((ship, index) => (
                            <li
                                className="list-group-item border-0 bg-transparent w-75 m-auto"
                                key={`${ship.id}-${index}`}
                                onClick={() => navigate(`/ship/${ship.id}`, { state: { activeTab: 'starships' } })}
                                style={{ cursor: 'pointer' }}>
                                <div className="card mb-3 bg-dark">
                                    <div className="card-body">
                                        <h5 className="card-title">{ship.name}</h5>
                                        <p className="card-text">Model: {ship.model}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {activeTab === 'starships' && nextPage && (<div className="d-flex justify-content-center  my-3">
                <h4 className="list d-flex mb-0 p-2 border border-secondary text-white"
                    type="button"
                    onClick={handleNextPage}>
                    View More
                </h4>
            </div>)}
        </div>
    );
};

export default HomePage;
