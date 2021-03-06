import React from "react";
import { Switch, Route } from "react-router-dom";
import RentalHome from "./pages/RentalHome.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import RentalDetail from "./pages/RentalDetail.js";
import SecretPage from "pages/SecretPage.js";
import AuthRoute from "Components/auth/AuthRoute.js";
import GuestRoute from "Components/auth/GuestRoute.js";
import RentalNew from "pages/RentalNew.js";
import RentalHomeSearch from "pages/RentalHomeSearch.js";
const RoutesTo = () => {
    return (
        <div className="container bwm-container">
            <Switch>
                <Route exact path="/" >
                    <RentalHome />
                </Route>
                <Route exact path="/rentals/:location/homes" >
                    <RentalHomeSearch />
                </Route>
                <GuestRoute exact path="/login" >
                    <Login />
                </GuestRoute>
                <GuestRoute exact path="/register" >
                    <Register />
                </GuestRoute>
                <AuthRoute exact path="/rentals/new" >
                    <RentalNew />
                </AuthRoute>
                <Route exact path="/rentals/:id" >
                    <RentalDetail />
                </Route>
                <AuthRoute exact path="/secret" >
                    <SecretPage />
                </AuthRoute>
                
            </Switch>
        </div>
    );
};
export default RoutesTo;
