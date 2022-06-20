import React from "react";
import { loginUser } from "actions";
import { isExpired, decodeToken } from "react-jwt";
import { connect } from 'react-redux'
import { userAuthenticated } from '../actions/index';
const { createContext, useContext } = React;
const AuthContext = createContext(null);




export const AuthBaseProvider = ({children, dispatch}) => {
    const checkAuthState = () => {
        const token = getToken();
        if (token && !isExpired(token)) {
            const decodedToken = decodeToken(token);
            dispatch(userAuthenticated(decodedToken));
        }
    }
    const isAuthenticated = () => {
        const token = getToken();
        return (isTokenValid(token))
    }
    const isTokenValid = (token) => {
        var a = decodeToken(token) || false;
        return a && !isExpired(token)
    }


    const getToken = () => {
        return localStorage.getItem('bwm_token');
    }
    const signOut = () => {
        localStorage.removeItem('bwm_token');
        dispatch({type: 'USER_SIGNED_OUT'});
    }
    const signIn = (loginData) => {
        return loginUser(loginData)
            .then((token) => {
                localStorage.setItem('bwm_token',token);
                const decodedToken = decodeToken(token);
                dispatch(userAuthenticated(decodedToken));
                return token;
            })
    };
    const authApi = {
        signIn,
        checkAuthState,
        signOut,
        isAuthenticated
    }
    return <AuthContext.Provider value = {authApi}>{children}</AuthContext.Provider>;
};
export const AuthProvider = connect()(AuthBaseProvider);

export const useAuth = () => {
    return useContext(AuthContext);
}


export const withAuth = (Component) => (props) => ( 
        <AuthContext.Consumer>
            {(authApi) => <Component {...props} auth = {authApi}/>}
        </AuthContext.Consumer>
)
