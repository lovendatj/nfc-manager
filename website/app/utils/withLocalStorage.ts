export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
export const setLocalStorageTimeout = (
  key: string,
  value: string,
  time: number
) => {
  const timestamp = Date.now() + time;
  localStorage.setItem(key, JSON.stringify({ value, timestamp }));
};
export const getLocalStorageTimeout = (key: string) => {
  const data = JSON.parse(String(localStorage.getItem(key)));
  if (data && data.timestamp > Date.now()) {
    return data.value;
  }
  return null;
};
export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
