import { getEnvionmentApiUrl } from "../utils/utils";
import axios from "axios";

export const fetchBlogs = async () => {
    const response = await axios.get( getEnvionmentApiUrl() + '/blog');
    return response.data;
};

export const fetchBlog = async (id: string) => {
    const response = await axios.get(getEnvionmentApiUrl() + '/blog/' + id);
    return response.data;
};
