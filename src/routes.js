import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/home";
import Layout from "./hoc/Layout/layout";
import Search from "./components/Search/search";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Dashboard from "./components/Dashboard/dashboard";
import Logout from "./components/Logout/logout";
import Restaurants from "./components/User/Restaurants/restaurants";
import Restaurant from "./components/User/Restaurants/restaurant";
import Customers from "./components/User/Customers/customers";
import Customer from "./components/User/Customers/customer";
import Riders from "./components/User/Riders/riders";
import Orders from "./components/orders/orders";
import User from "./components/User/user";
import AddUser from "./components/User/addUser";
import AddRestaurant from "./components/User/addRestaurant";
import AddMenuItem from "./components/User/Restaurants/addMenuItem";
import RestMenu from "./components/User/Restaurants/restMenu";
import ViewCart from "./components/User/Cart/viewCart";


const Routes = () => {


    return <Layout>

        <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/search" exact component={Search} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/riders" exact component={Riders} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/restaurants" exact component={Restaurants} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/customers/:id" exact component={Customer} />
            <Route path="/restaurant/add-restaurant" exact component={AddRestaurant} />
            <Route path="/restaurant/:id" exact component={Restaurant} />
            <Route path="/restaurant/addMenuItem/:id" exact component={AddMenuItem} />
            <Route path="/user/add-user" exact component={AddUser} />
            <Route path="/user/viewCart" exact component={ViewCart} />
            <Route path="/user/:id" exact component={User} />
            <Route path="/restaurant/:id/menu" exact component={RestMenu} />
        </Switch>

    </Layout>
}

export default Routes;