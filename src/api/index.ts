import axios, { AxiosResponse } from 'axios';

const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postData = async (endpoint: string, body: object) => {
  try {
    // TODO review this
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.post(endpoint, body);
    // const responseData = response.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateData = async (endpoint: string, body: object) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse = await axios.put(endpoint, body);
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async (endpoint: string) => {
  try {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const repsonse: AxiosResponse = await axios.delete(endpoint);
  } catch (err) {
    console.log(err);
  }
};

export default fetchData;
