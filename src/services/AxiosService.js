import axios from 'axios';

class AxiosService {
    axiosInstance = null;
    constructor() {
        this.initInstance();
    }

    initInstance() {
        this.axiosInstance = axios.create({
            baseURL : '/api/v1',
            timeout: 5000 // everything longer than 5 secs is considered a failed request
        });
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem('bwm_token');
            if (token) {
                config.headers.Authorization =  `Bearer ${token}`;
                
            }
            return config;
        });
    }
    get bwmAxios() {
        return this.axiosInstance;
    }
}


export default new AxiosService();