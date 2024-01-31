import axios from "axios";
import { getEnvironmentApiUrl } from "../utils/utils";

const instance = axios.create({
    baseURL: getEnvironmentApiUrl(),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance;