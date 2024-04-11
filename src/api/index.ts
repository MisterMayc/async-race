import axios, { AxiosResponse } from 'axios';

const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    // TODO review the ts ignore
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const postData = async (endpoint: string, body: object) => {
  try {
    // TODO review this
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.post(endpoint, body);
    // const responseData = response.data;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const updateData = async (endpoint: string, body: object) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.put(endpoint, body);
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.delete(endpoint);
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const patchData = async (endpoint: string, body?: object) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.patch(endpoint);
    // TODO add the line below to all the req-s
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export const putData = async (endpoint: string, body?: object) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.put(endpoint, body);
    // TODO add the line below to all the req-s
    return response;
  } catch (error) {
    // @ts-ignore
    throw new Error(error.message);
  }
};

export default fetchData;
