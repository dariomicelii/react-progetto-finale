import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export const getAllRecords = () => axios.get(`${API_BASE_URL}/records`);
export const getRecordById = (id) => axios.get(`${API_BASE_URL}/records/${id}`);
