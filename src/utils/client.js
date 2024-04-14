import axios from'axios'
import { LOCAL_STORAGE_TOKEN_KEY, getItem, removeItem, setItem } from './storageManager';
let baseURL = 'http://localhost:4000'
export const axioClient = axios.create({
    baseURL: baseURL  ,
    withCredentials:true
})


axioClient.interceptors.request.use((request) => {
    const accessToken = getItem(LOCAL_STORAGE_TOKEN_KEY);
    request.headers["Authorization"] = `Bearer ${accessToken}`;

    return request;
});

axioClient.interceptors.response.use(async (respone) => {
    const data = respone.data;
    if (data.status === "ok") {
        // console.log(data)
        return data;
    }

    const originalRequest = respone.config;
    const statusCode = data.statusCode;
    const error = data.message
    

    if (statusCode === 401 && !originalRequest._retry) {
        // means the access token has expired
        originalRequest._retry = true;

        const response = await axios
            .create({
                withCredentials: true,
            })
            .get(`${baseURL}/auth/refreshToken`);

        if (response.data.status === "ok") {
            setItem(LOCAL_STORAGE_TOKEN_KEY, response.data.result.accessToken);
            originalRequest.headers[
                "Authorization"
            ] = `Bearer ${response.data.result.accessToken}`;

            console.log('returned token: ', response.data.result.accessToken)
            return axios(originalRequest);
        } else {
            removeItem(LOCAL_STORAGE_TOKEN_KEY);
            window.location.replace("/login", "_self");
            return Promise.reject(error);
        }
    }
    return Promise.reject(error);
});