import api from './api.js';

export const analyzeAgreement = async (file) => {
  const fd = new FormData();
  fd.append('document', file);
  const res = await api.post('/agreement/analyze', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};