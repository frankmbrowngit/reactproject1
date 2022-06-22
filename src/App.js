import React, { useEffect } from "react";
import Header from "./Components/shared/Header.js";
import RoutesTo from "./RoutesTo.js";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { initStore } from "./store/index.js";
import { AuthProvider, useAuth } from "providers/AuthProvider.js";
import { MapProvider } from "providers/MapProvider";
import { ToastContainer } from 'react-toastify';
const store = initStore();
const Providers = ({ children }) => (
    <Provider store={store}>
        <AuthProvider>
            <MapProvider apiKey="NWgf2FGVMgldsHlSraMTAfOGIpG0G5D3">{children}</MapProvider>
        </AuthProvider>
    </Provider>
);
const BwmApp = () => {
    const authService = useAuth();
    useEffect(() => {
        authService.checkAuthState();
    }, [authService]);
    return (
        <Router>
            <Header logout={authService.signOut} />
            <RoutesTo />
        </Router>
    );
};
const App = () => {
    return (
        <Providers>
        <ToastContainer />
            <BwmApp />
        </Providers>
    );
};
export default App;
