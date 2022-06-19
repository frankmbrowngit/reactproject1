import React from "react";
import {Route, Redirect} from 'react-router-dom';
import { useAuth } from "providers/AuthProvider";
const GuestRoute = ({children, ...rest }) => {
    const authService = useAuth();
    const onlyChild = React.Children.only(children);
    if (!authService.isAuthenticated()) {
        return <Route {...rest} render={(props) => React.cloneElement(onlyChild,{...rest,...props})} />
    } else {
        return <Redirect to={{pathname: '/'}}/>;
    }
}

export default GuestRoute;