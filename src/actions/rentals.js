import AxiosService from "services/AxiosService"; // Instance and not class itself
const { bwmAxios } = AxiosService;

export const fetchRentals = (location) => (dispatch) => {
    const query = location ? `/rentals?city=${location}` : "/rentals";
    dispatch({ type: "REQUEST_DATA", resource: "rentals" });
    bwmAxios.get(query).then((res) => {
        const rentals = res.data;
        dispatch({ type: "REQUEST_DATA_COMPLETE", resource: "rentals" });
        dispatch({
            type: "FETCH_RENTALS",
            rentals,
        });
    });
};
export const createRental = (newRental) => {
    return bwmAxios.post("/rentals", newRental);
};
export const fetchRentalById = (rentalId) => async (dispatch) => {
    dispatch({ type: "REQUEST_DATA", resource: "rental" });
    const res = await bwmAxios.get(`/rentals/${rentalId}`);
    dispatch({type: 'REQUEST_DATA_COMPLETE', resource: 'rental'});
    dispatch({
        type: "FETCH_RENTAL_BY_ID",
        rental: res.data,
    });
};
