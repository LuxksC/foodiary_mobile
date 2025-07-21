import axios from 'axios';

// Instancia do axios para facilitar a chamada das requests
export const httpClient = axios.create({
  baseURL: 'https://4af1y8czld.execute-api.us-east-1.amazonaws.com',
});