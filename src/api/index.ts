import axios, { AxiosResponse } from 'axios';

const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const postData = async (endpoint: string, body: object) => {
  try {
    const response: AxiosResponse = await axios.post(endpoint, body);
    return response;
    // const responseData = response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const updateData = async (endpoint: string, body: object) => {
  try {
    const response: AxiosResponse = await axios.put(endpoint, body);
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    const response: AxiosResponse = await axios.delete(endpoint);
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const patchData = async (endpoint: string, body?: object) => {
  try {
    const response: AxiosResponse = await axios.patch(endpoint, body);
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const putData = async (endpoint: string, body?: object) => {
  try {
    const response: AxiosResponse = await axios.put(endpoint, body);
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export default fetchData;
