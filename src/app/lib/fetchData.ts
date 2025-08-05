import axios, { AxiosError } from 'axios'

function handleAxiosError(error: AxiosError | any): never {
  const message =
    error?.response?.data?.message || error.message || 'Unknown error'
  console.error('Fetch Error:', message)
  throw new Error(message)
}

export const fetchDataGet = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url)
    return response.data
  } catch (e) {
    handleAxiosError(e)
  }
}

export const fetchDataPost = async <T = any>(url: string, data = {}): Promise<T> => {
  try {
    const response = await axios.post<T>(url, data, {
      headers: { 'Content-Type': 'application/json' },
    })
    return response.data
  } catch (e) {
    handleAxiosError(e)
  }
}


