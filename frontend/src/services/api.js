import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  timeout: 10000,
});

export const fetchSummary = () => client.get('/dashboard/summary');
export const fetchDefaultingClients = () => client.get('/dashboard/defaulting-clients');
export const fetchTopOfficers = () => client.get('/dashboard/top-officers');
export const fetchBranchGrowth = () => client.get('/dashboard/branch-growth');
export const fetchPAR = () => client.get('/dashboard/par');
