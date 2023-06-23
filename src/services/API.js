import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL,
  headers: {
  //  Authorization: `<Auth Token>`,
      'Content-Type': 'multipart/form-data',
    }
});