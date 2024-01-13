import { getEnvionmentApiUrl } from "../utils/utils";
import axios from "axios";

export const fetchPropertySearchData = async (searchParams: any) => {
    const response = await axios.get(getEnvionmentApiUrl() + '/properties', {
        params: {
            searchTerm: searchParams.get("searchTerm")?.replace('-', ''),
            city: searchParams.get("city"),
            zip: searchParams.get("zip"),
            price: searchParams.get("price"),
            propertyClass: searchParams.get("propertyClass"),
            sqft: searchParams.get("sqft"),
            lotSize: searchParams.get("lotSize"),
            sort: searchParams.get("sort"),
            featured: searchParams.get("featured"),
            limit: 10000,
        },
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    },);
    return response.data;
};


export const fetchFeaturedProperties = async () => {
    const response = await axios.get(getEnvionmentApiUrl() + '/properties', {
        params: {
            featured: true,
            limit: 4,
        },
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
};

export const fetchZipCodes = async () => {
    const response = await axios.get(getEnvionmentApiUrl() + '/zip',{
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
}

export const favoriteProperty = async (propertyId: string, userId:string) => {
    const response = await axios.post(getEnvionmentApiUrl() + '/properties/save-property', {propertyId, userId}, {
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
}

export const unfavoriteProperty = async (propertyId: string, userId:string) => {
    const response = await axios.post(getEnvionmentApiUrl() + '/properties/remove-saved-property', {propertyId, userId}, {
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
}

export const getFavoriteProperties = async (userId:string) => {
    const response = await axios.get(getEnvionmentApiUrl() + '/properties/saved-properties', {
        params: {
            userId
        },
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
}
