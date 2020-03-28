import axios from 'axios';

const baseURL = 'https://api.kawalcorona.com/';

export const API = axios.create({
  baseURL: baseURL
})