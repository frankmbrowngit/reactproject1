import React from "react";
export const StateContext = React.createContext({});
const Provider = ( { children, store} ) => {
    return (
        <StateContext.Provider value = {store}>{children}</StateContext.Provider>
    )
}
export default Provider;