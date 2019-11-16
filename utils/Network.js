import http from 'axios'

const instance = http.create({
  baseURL: 'https://epitech-api.titan-group.fr/',
  timeout: 60*5*1000
});

export default instance;
