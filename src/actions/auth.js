import AxiosService from 'services/AxiosService'; // Instance and not class itself
import { extractApiErrors } from './index';
const { bwmAxios } = AxiosService;

export const registerUser = (registerData) => {
    return bwmAxios
    .post('/users/register',registerData)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const loginUser = (loginData) => {
    return bwmAxios
    .post('/users/login',loginData)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const userAuthenticated = (decodedToken) => {
    return {
        type: 'USER_AUTHENTICATED',
        username: decodedToken.username || ''
    }
}