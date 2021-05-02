import React, {useState, useEffect} from 'react'
import RestaurantDataService from '../services/restaurant'
import {Link} from 'react-router-dom'

const RestaurantsList = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchZip, setSearchZip] = useState("");
    const [searchCuisine, setSearchCuisine] = useState("");
    const [cuisines, setCuisines] = useState(["All Cuisines"]);

    useEffect(() => {
        retrieveRestaurants();
        retrieveCuisines();
    }, []);

    const onChangeSearchName = (event) => {
        const searchName = event.target.value;
        setSearchName(searchName);
    };

    const onChangeSearchZip = (event) => {
        const searchZip = event.target.value;
        setSearchZip(searchZip);
    };

    const onChangeSearchCuisine = (event) => {
        const searchCuisine = event.target.value;
        setSearchCuisine(searchCuisine);

    };

    const retrieveRestaurants = () => {
        RestaurantDataService.getAll()
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const retrieveCuisines = () => {
        RestaurantDataService.getCuisines()
            .then(response => {
                setCuisines(["All Cuisines"].concat(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };

    const refreshList = () => {
        retrieveRestaurants();
    };

    const find = (by, query) => {
        RestaurantDataService.find(by, query)
            .then(response => {
                setRestaurants(response.data.restaurants);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const findByName = () => {
        find("name", searchName, )
    };

    const findByZip = () => {
        find("zipcode", searchZip)
    };

    const findByCuisine = () => {
        if (searchCuisine === "All Cuisines") {
            refreshList();
        } else {
            find("cuisine", searchCuisine)
        }
    };

    return (
        <div>
            <div className="row pb-1">
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by ZIP Code"
                        value={searchZip}
                        onChange={onChangeSearchZip}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByZip}
                        >
                            Search
                        </button>
                    </div>
                </div>
                <div className="input-group col-lg-4">
                    <select onChange={onChangeSearchCuisine}>
                        {cuisines.map(cuisine => {
                            return (
                                <option value={cuisine}> {cuisine.substr(0, 20)} </option>
                            )
                        })}
                    </select>
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByCuisine}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                {restaurants.map((restaurant, index) => {
                    /* Using the Data Structure from the Database */
                    const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
                    return (
                        <div className="col-lg-4 pb-1" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={"/restaurants/" + restaurant._id}
                                              className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/place/" + address}
                                           className="btn btn-primary col-lg-5 mx-1 mb-1">View Map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default RestaurantsList;
