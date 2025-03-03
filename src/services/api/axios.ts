import axios from 'axios';

const baseAxios = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default baseAxios;