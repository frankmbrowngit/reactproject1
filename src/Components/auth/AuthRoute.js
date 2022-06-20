import React from "react";
import {Route, Redirect} from 'react-router-dom';
import { useAuth } from "providers/AuthProvider";
const AuthRoute = ({children, ...rest }) => {
    const authService = useAuth();
    // eslint-disable-next-line 
    const onlyChild = React.Children.only(children);
    if (authService.isAuthenticated()) {
        return <Route {...rest} render={(props) => React.cloneElement(children,{...rest,...props})} />
    } else {
        return <Redirect to={{pathname: '/login'}}/>;
    }
}

export default AuthRoute;