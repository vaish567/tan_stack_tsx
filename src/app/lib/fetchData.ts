import axios, { AxiosError } from 'axios';

function handleAxiosError(error: AxiosError | any): never {
  const message =
    error?.response?.data?.message || error.message || 'Unknown error';
  console.error('Fetch Error:', message);
  throw new Error(message);
}

// GET
export const fetchDataGet = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

// POST
export const fetchDataPost = async <T = any>(
  url: string,
  data: object = {}
): Promise<T> => {
  try {
    const response = await axios.post<T>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

// PUT
export const fetchDataPut = async <T = any>(
  url: string,
  data: object = {}
): Promise<T> => {
  try {
    const response = await axios.put<T>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

// PATCH
export const fetchDataPatch = async <T = any>(
  url: string,
  data: object = {}
): Promise<T> => {
  try {
    const response = await axios.patch<T>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};

// DELETE
export const fetchDataDelete = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.delete<T>(url);
    return response.data;
  } catch (e) {
    handleAxiosError(e);
  }
};
