import { AxiosInstance } from 'axios';

export type EncryptDataType = { payload: string; key: string };

export const getDigestData = async (
  client: AxiosInstance,
  encryptData: EncryptDataType
): Promise<string> => {
  try {
    const {
      data: { digest },
    } = await client.post('encrypt', encryptData);
    return digest;
  } catch (error) {
    console.log('getClaim error: ', error);
    throw error;
  }
};
