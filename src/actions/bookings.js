import AxiosService from 'services/AxiosService'; // Instance and not class itself
import { extractApiErrors } from './index';
const { bwmAxios } = AxiosService;



export const createBooking = booking => {
    return bwmAxios.post('/bookings',booking)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const getBookings = (rentalId) => {
    return bwmAxios.get(`/bookings?rental=${rentalId}`)
    .then(res => res.data)
    .catch(error => console.log(error))
}