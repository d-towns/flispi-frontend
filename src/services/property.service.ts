import { Property } from "../models/Property.model";
import { getEnvionmentApiUrl } from "../utils/utils";
import axios from "axios";

interface ResponseMetadata {
    total: number;
    limit: number;
    offset: number;
}

// Define an interface for the entire API response
interface PropertyApiResponse {
    properties: Property[];
    metadata: ResponseMetadata;
}


export const fetchPropertySearchData = async (searchParams: any, pageNumber: number, pageSize: number) : Promise<PropertyApiResponse> => {
    // Calculate the offset
    const offset = (pageNumber - 1) * pageSize;

    const response = await axios.get<PropertyApiResponse>(getEnvionmentApiUrl() + '/properties', {
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
            limit: pageSize, // Set the limit to the page size
            offset: offset, // Set the offset based on the current page number
        },

        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });


    return response.data;
};

export const fetchFeaturedProperties = async (): Promise<PropertyApiResponse> => {
    const response = await axios.get<PropertyApiResponse>(getEnvionmentApiUrl() + '/properties', {
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
    const response = await axios.get(getEnvionmentApiUrl() + '/properties/zipcodes',{
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
