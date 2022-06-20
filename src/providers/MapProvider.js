import React, {useRef} from "react";
import tt from "@tomtom-international/web-sdk-maps";
import axios from 'axios';
const { createContext, useContext } = React;

const MapContext = createContext(null);




export const MapProvider = ({children, apiKey}) => {
    const cache = useRef({});
    const normalizeLocation = (location) => {
        return location.replace(/\s/g,'').toLowerCase(); // regex expression to remove all spaces
    }
    const cacheLocation = (location, position) => {
        const locationKey = normalizeLocation(location);
        return cache.current[locationKey]  = position;
    }
    const getCachedLocation = (location) => {
        const locationKey = normalizeLocation(location);
        return cache.current[locationKey]
    }
    const initMap = () => {
        const map = tt.map({
            key: apiKey,
            container: "bwm-map",
            zoom: 15,
            scrollZoom: false
        });
        return map;
    }
    const setCenter = (map, position) => {
        map.setCenter(new tt.LngLat(position.lon,position.lat));
    }
    const addMarker = (map, position) => {
        const markerDiv = document.createElement('div');
        markerDiv.className = 'bwm-marker';
        new tt.Marker({
            element: markerDiv
        })
        .setLngLat([position.lon,position.lat])
        .addTo(map)
    }
    const addPopupMessage = (map, message) => {
        new tt.Popop({
            className: 'bwm-popup',
            closeButton: false,
            closeOnClick: false
        }).setLngLat(new tt.LngLat(0,0))
        .setHTML(`<p>${message}</p>`)
        .addTo(map)
    }

    const locationNotFound = () => {
        return Promise.reject('Location not found');
    }
    const getGeoPosition = (location) => {
        const cachedPosition = getCachedLocation(location);
        return cachedPosition ? Promise.resolve(cachedPosition) : requestGeoLocation(location);
    }
    const requestGeoLocation = (location) => {
        // check cache first
        return axios.get(`https://api.tomtom.com/search/2/geocode/${location}.json?key=${apiKey}`)
        .then(res => res.data)
        .then(tomResp => {
            const results = tomResp.results;
            console.log('Api request made (Getting map)');
            if (results && results.length > 0) {
                const { position } = results[0];
                cacheLocation(location,position);
                return position;
            } else {
                return locationNotFound();
            }
        }).catch(() => {return locationNotFound();})
    }





    const mapApi = {
        initMap,
        getGeoPosition,
        setCenter,
        addMarker,
        addPopupMessage
    }
    return <MapContext.Provider value = {mapApi}>{children}</MapContext.Provider>;
};

export const useMap = () => {
    return useContext(MapContext);
}