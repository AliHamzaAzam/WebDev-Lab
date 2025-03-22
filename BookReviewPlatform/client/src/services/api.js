import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/books',
    timeout: 5000
});

export const getBooks = () => api.get('/');
export const getBook = (id) => api.get(`/${id}`);
export const addBook = (bookData) => api.post('/', bookData);
export const updateBook = (id, bookData) => api.put(`/${id}`, bookData);
export const addReview = (bookId, reviewData) => api.post(`/${bookId}/reviews`, reviewData);