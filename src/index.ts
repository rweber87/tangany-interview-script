import dotenv from 'dotenv';
import { instance } from './auth/auth';
import { delay } from './utils/delay';
import { getClaimData, getDigestData } from './api';
import { EncryptDataType } from './api/getDigestData';

dotenv.config();

enum Status {
  Initializing = 'Initializing',
  AcceptingDigest = 'Accepting digest',
  Decrypting = 'Decrypting',
  Deinitializing = 'Deinitializing',
  Completed = 'Completed',
}

const script = async () => {
  const client = await instance();

  // Claim a new process id and extract the process, claim & key name variables
  // const { data } = await client.get('/claim');
  // const processName: string = data?.resources.key.name;
  // const processClaim: string = data?.resources.claim;
  // const processLink: string = data?.links[0].href;
  const { payload, key, link } = await getClaimData(client);
  console.log('rcw claim', payload, key, link);

  const encryptData: EncryptDataType = {
    payload: payload,
    key: key,
  };

  // Encrypt the claim using the generated key before the key expires
  // const {
  //   data: { digest },
  // } = await client.post('encrypt', encryptData);
  const digest = await getDigestData(client, encryptData);

  console.log('rcw encrypted', digest);

  // Check process status
  let currentStatus: Status = Status.Initializing;
  while (currentStatus !== Status.AcceptingDigest) {
    const {
      data: { status },
    } = await client.get(`${link}`);
    console.log('rcw status', status);
    currentStatus = status as Status;
    await delay(2000);
  }

  // Pass the encrypted digest to the asynchronous process as soon its status is Accepting digest
  const encryptedData = await client.post(`${link}`, { digest });
  console.log('rcw encryptedData', encryptedData.data);

  // Fetch the process hash when the asynchronous process completes
  let hash;
  while (!hash) {
    const { data: newData } = await client.get(`${link}`);
    console.log('rcw newData', newData);
    if (newData.hash) {
      hash = newData.hash;
    }
    await delay(2000);
  }

  console.log('rcw hash', hash);
};

script();
