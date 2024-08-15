import axios from 'axios';
import {SERVER_API} from '@env';

const api = axios.create({
  baseURL: 'http://192.168.32.11:8080/api',
});

export default api;
