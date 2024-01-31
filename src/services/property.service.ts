import { Property } from "../models/Property.model";
import { getEnvionmentApiUrl } from "../utils/utils";
import axios from "axios";

interface ResponseMetadata {
    total: number;
    limit: number;
    offset: number;
}

interface PropertyApiResponse {
    properties: Property[];
    metadata: ResponseMetadata;
}

interface PropertySearchRequest {
    searchParams: URLSearchParams;
    pageNumber: number;
    pageSize: number;
}

export const fetchPropertySearchData = async ({searchParams, pageNumber, pageSize} : PropertySearchRequest) : Promise<PropertyApiResponse> => {
    
    const offset = pageNumber === 0 ? 0 : (pageNumber) * pageSize;

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

export const fetchProperty = async (id:string): Promise<PropertyApiResponse> => {
    const response = await axios.get<Property>(getEnvionmentApiUrl() + `/property/${id}`)
    return {properties: [response.data], metadata: {total: 1, limit: 1, offset: 0}}
  }

export const fetchZipCodes = async () : Promise<string[]> => {
    const response = await axios.get<string[]>(getEnvionmentApiUrl() + '/properties/zipcodes',{
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    
    return response.data;
}

export const favoriteProperty = async (propertyId: string, userId:string) => {
    const response = await axios.post<boolean>(getEnvionmentApiUrl() + '/properties/save-property', {propertyId, userId}, {
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    
    return response.data;
}

export const unfavoriteProperty = async (propertyId: string, userId:string): Promise<boolean> => {
    const response = await axios.post<boolean>(getEnvionmentApiUrl() + '/properties/remove-saved-property', {propertyId, userId}, {
        headers:{
            'Content-Type': 'application/json'
          },
        withCredentials: true
    });
    return response.data;
}

export const getFavoriteProperties = async (userId:string): Promise<PropertyApiResponse> => {
    const response = await axios.get<PropertyApiResponse>(getEnvionmentApiUrl() + '/properties/saved-properties', {
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

export const getSavedProperty = async (userId:string, propertyId:string): Promise<boolean> => {
    const response = await axios.get<boolean>(getEnvionmentApiUrl() + '/properties/saved-property', {
        params: {
            userId,
            propertyId
        },
        headers:{
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    return response.data;
}
