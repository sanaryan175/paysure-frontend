import api from './api.js';

/**
 * Analyze loan risk.
 * Sends multipart/form-data so both form fields + optional PDF go together.
 */
export const analyzeLoan = async (formData) => {
  const response = await api.post('/loan-risk/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getLoanHistory = async () => {
  const response = await api.get('/loan-risk/history');
  return response.data;
};