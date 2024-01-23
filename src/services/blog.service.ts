import { getEnvionmentApiUrl } from "../utils/utils";
import axios from "axios";

export const fetchBlogs = async () => {
    const response = await axios.get( getEnvionmentApiUrl() + '/blog');
    return response.data;
};

export const fetchBlog = async (slug: string) => {
    const response = await axios.get(getEnvionmentApiUrl() + '/blog/' + slug);
    return response.data;
};
