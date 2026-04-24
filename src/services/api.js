import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const analyticsService = {
    getSummary: () => api.get('/analytics/summary').then(res => res.data),
    getTrends: () => api.get('/analytics/trends').then(res => res.data),
    getSegments: () => api.get('/analytics/segments').then(res => res.data),
    getHeatmap: () => api.get('/analytics/heatmap').then(res => res.data),
    getScatter: () => api.get('/analytics/scatter').then(res => res.data),
    getTopUsers: () => api.get('/analytics/top-users').then(res => res.data),
    getForecasts: (params) => api.get('/analytics/forecasts', { params }).then(res => res.data),
    getForecastById: (id) => api.get(`/analytics/forecasts/${id}`).then(res => res.data),
};

// Prediction & ML Services
export const predictUser = (userData) => api.post('/predict-user', userData).then(res => res.data);
export const trainModel = (config) => api.post('/train', config).then(res => res.data);

// Reporting Services
export const getDashboardData = () => api.get('/dashboard').then(res => res.data);
export const generateReport = (type) => api.post('/reports/generate', { type }).then(res => res.data);
export const getReports = () => api.get('/reports').then(res => res.data);
export const getReportById = (id) => api.get(`/reports/${id}`).then(res => res.data);

export const downloadReport = async (id) => {
    const response = await api.get(`/reports/${id}/pdf`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Report_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const downloadCsv = async (id) => {
    const response = await api.get(`/reports/${id}/csv`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Data_${id}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export default api;
