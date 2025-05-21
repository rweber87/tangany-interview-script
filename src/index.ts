import dotenv from 'dotenv';
import { instance } from './auth/auth';
import {
  checkClaimStatus,
  encryptData,
  fetchHash,
  getClaimData,
  getDigestData,
} from './api';
import { EncryptDataType } from './api/getDigestData';
import { AxiosInstance } from 'axios';

dotenv.config();

const script = async () => {
  const client: AxiosInstance = await instance();

  // Claim a new process id and extract the process, claim & key name variables
  const { payload, key, link } = await getClaimData(client);
  console.log('rcw claim', payload, key, link);

  const encryptedData: EncryptDataType = {
    payload: payload,
    key: key,
  };

  // Encrypt the claim using the generated key before the key expires
  const digest: string = await getDigestData(client, encryptedData);

  console.log('rcw encrypted', digest);

  // Check process status
  await checkClaimStatus(client, link);

  // Pass the encrypted digest to the asynchronous process as soon its status is Accepting digest
  await encryptData(client, link, digest);

  // Fetch the process hash when the asynchronous process completes
  const hash: string = await fetchHash(client, link);

  console.log('rcw hash', hash);
};

script();
