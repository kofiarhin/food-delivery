import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Layout from "./hoc/Layout/layout";
import Search from "./components/Search/search";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Dashboard from "./components/Dashboard/dashboard";
import Logout from "./components/Logout/logout";
import Restaurants from "./components/Restaurants/restaurants";
import Restaurant from "./components/Restaurants/restaurant";
import Customers from "./components/Customers/customers";
import Customer from "./components/Customers/customer";
import Riders from "./components/Riders/riders";
import Orders from "./components/orders/orders";
import User from "./components/User/user";



const Routes = () => {


    return <Layout>

        <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/search" exact component={Search} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/restaurants" exact component={Restaurants} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/riders" exact component={Riders} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/restaurants/:id" exact component={Restaurant} />
            <Route path="/customers/:id" exact component={Customer} />
            <Route path="/user/profile" exact component={User} />
        </Switch>

    </Layout>
}

export default Routes;