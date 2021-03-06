import axios from "axios";
import { toast } from "react-toastify";

//set default baseURL so when we use http request this will be add in front
//example: http.get("/bikes") will be http.get("http://localhost:7070/bikes") in development env
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
    console.log("interceptor called");
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        toast.error("Unexpected error occured");
        console.log("logging unexpected error", error);
    }
    return Promise.reject(error);
});

const http = {
    get: axios.get,
    delete: axios.delete,
    post: axios.post,
    put: axios.put
}

export default http;