import { AxiosInstance } from 'axios';

export const encryptData = async (
  client: AxiosInstance,
  link: string,
  digest: string
) => {
  try {
    const { data } = await client.post(`${link}`, { digest });
    console.log('rcw encryptedData', data);
  } catch (error) {
    console.log('encryptData error: ', error);
    throw error;
  }
};
