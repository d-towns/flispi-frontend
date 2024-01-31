import axios from "./axios";

export const fetchBlogs = async () => {
    const response = await axios.get('/blog');
    return response.data;
};

export const fetchBlog = async (slug: string) => {
    const response = await axios.get('/blog/' + slug);
    return response.data;
};
