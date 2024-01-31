import axios from "axios";
import { getEnvironmentApiUrl } from "../utils/utils";

export const login = async (parmas : { username: string, password: string}) => {
    const response = await axios.post( getEnvironmentApiUrl() + '/login', parmas, { headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    return response.data;
};

export const signUp = async (parmas : {username: string, email: string, password: string, phone:string, firstName: string, lastName: string, company: string}) => {
    const response = await axios.post( getEnvironmentApiUrl() + '/register', parmas,{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
    return response.data;
};

export const logout = async () => {
    const response = await axios.post( getEnvironmentApiUrl() + '/logout', {} ,{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
    return response.data;
}

export const getCurrentUser = async () => {
    const response = await axios.get( getEnvironmentApiUrl() + '/user',{
    headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true});
      
    return response.data;
}

