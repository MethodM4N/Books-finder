export const getLocalStorageApiKey = (): string => {
  const data = localStorage.getItem('apiKey');
  const apiKey = data ? JSON.parse(data) : '';
  return apiKey;
};
