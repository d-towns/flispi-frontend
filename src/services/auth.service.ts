import axios from "axios";
import { getEnvionmentApiUrl } from "../utils/utils";

export const login = async (parmas : { username: string, password: string}) => {
    const response = await axios.post( getEnvionmentApiUrl() + '/login', parmas, { headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    return response.data;
};

export const signUp = async (parmas : {username: string, email: string, password: string, phone:string, firstName: string, lastName: string, company: string}) => {
    const response = await axios.post( getEnvionmentApiUrl() + '/register', parmas,{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
    return response.data;
};

export const logout = async () => {
    const response = await axios.post( getEnvionmentApiUrl() + '/logout', {} ,{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await axios.get( getEnvionmentApiUrl() + '/user',{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
      
    return response.data;
}

