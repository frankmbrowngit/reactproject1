

import AxiosService from 'services/AxiosService'; // Instance and not class itself
const { bwmAxios } = AxiosService;

export const fetchRentals = () => async dispatch => {
    const res  = await bwmAxios.get('/rentals');
    dispatch({
        type: "FETCH_RENTALS",
        rentals: res.data
    });
}

export const createRental = (newRental) => {
return bwmAxios.post('/rentals', newRental)
}
export const fetchRentalById = (rentalId) => async dispatch => {
dispatch({type: "IS_FETCHING_RENTAL"});
const res = await bwmAxios.get(`/rentals/${rentalId}`);   
dispatch({
        type: "FETCH_RENTAL_BY_ID",
        rental : res.data
});
}