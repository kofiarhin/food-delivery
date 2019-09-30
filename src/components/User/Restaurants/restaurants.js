import React from "react";
import Header from '../../Header/header';
import { Link } from 'react-router-dom';

const Restaurants = () => {


    return <div>

        <Header />
        <div className="container">

            <div className="header-wrapper">

                <h1 className="main-title">List or Restaurants</h1>

                <Link to="user/add-restaurant" className="cta">Add Restaurant</Link>
            </div>


        </div>

    </div>
}


export default Restaurants;