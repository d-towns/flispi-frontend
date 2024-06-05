import { Property } from "../models/Property.model";
import axios from "./axios";

interface ResponseMetadata {
    total: number;
    limit: number;
    offset: number;
}

interface PropertyApiResponse {
    properties: Property[];
    metadata: ResponseMetadata;
    errors?: string[];
}

interface PropertySearchRequest {
    searchParams: URLSearchParams;
    pageNumber: number;
    pageSize: number;
}

export const fetchPropertySearchData = async ({ searchParams, pageNumber, pageSize }: PropertySearchRequest): Promise<PropertyApiResponse> => {
    try {
        const offset = pageNumber === 0 ? 0 : (pageNumber) * pageSize;

        const searchParamsObj = Object.fromEntries(searchParams.entries());

        const response = await axios.get<PropertyApiResponse>('/properties', {
            params: {
                ...searchParamsObj,
                limit: pageSize, // Set the limit to the page size
                offset: offset, // Set the offset based on the current page number
            },

            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });


        return response.data;
    } catch (error) {
        console.log(error)
        return { properties: [], metadata: { total: 0, limit: 0, offset: 0 } }
    }
};

export const fetchFeaturedProperties = async (): Promise<PropertyApiResponse> => {
    try {
        const response = await axios.get<PropertyApiResponse>('/properties', {
            params: {
                featured: true,
                limit: 4,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return { properties: [], metadata: { total: 0, limit: 0, offset: 0 } }
    }
};

export const fetchProperty = async (id: string): Promise<PropertyApiResponse> => {
    try {
        const response = await axios.get<Property>(`/property/${id}`)
        return { properties: [response.data], metadata: { total: 1, limit: 1, offset: 0 } }
    } catch (error) {
        console.log(error)
        return { properties: [], metadata: { total: 0, limit: 0, offset: 0 } }
    }
}

export const fetchZipCodes = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>('/properties/zipcodes', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.log(error)
        return [];
    }
}

export const favoriteProperty = async (propertyId: string, userId: string) => {
    try {
        const response = await axios.post<{ success: boolean }>('/properties/save-property', { propertyId, userId }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        return response.data.success;
    } catch (error) {
        console.log(error)
    }
}

export const unfavoriteProperty = async (propertyId: string, userId: string): Promise<boolean> => {
    try {
        const response = await axios.post<{ success: boolean }>('/properties/remove-saved-property', { propertyId, userId }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data.success;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const getFavoriteProperties = async (userId: string): Promise<PropertyApiResponse> => {
    try {
        const response = await axios.get<PropertyApiResponse>('/properties/saved-properties', {
            params: {
                userId
            },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return { properties: [], metadata: { total: 0, limit: 0, offset: 0 } }
    }
}

export const getSavedProperty = async (userId: string, propertyId: string): Promise<boolean> => {
    try {
        const response = await axios.get<{ success: boolean }>('/properties/saved-property', {
            params: {
                userId,
                propertyId
            },
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return response.data.success;
    } catch (error) {
        console.log(error)
        return false;
    }
}
