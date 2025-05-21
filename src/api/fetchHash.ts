import { AxiosInstance } from 'axios';
import { delay } from '../utils/delay';

export const fetchHash = async (
  client: AxiosInstance,
  link: string
): Promise<string> => {
  let hash;
  try {
    while (!hash) {
      const { data: newData } = await client.get(`${link}`);
      console.log('rcw newData', newData);
      if (newData.hash) {
        hash = newData.hash;
      }
      await delay(2000);
    }
    return hash;
  } catch (error) {
    console.log('fetchHash error: ', error);
    throw error;
  }
};
