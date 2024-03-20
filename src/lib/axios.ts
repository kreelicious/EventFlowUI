import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};
const BACKEND_API_URL = "http://localhost:4000";
export default axios.create({
  baseURL: BACKEND_API_URL,
  headers,
});

export const axiosAuth = axios.create({
  baseURL: BACKEND_API_URL,
  headers,
});