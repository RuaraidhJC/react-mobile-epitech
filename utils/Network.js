import http from 'axios';

const instance = http.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: 'https://epitech-react.herokuapp.com/',
  timeout: 60 * 5 * 1000,
});

export default instance;
