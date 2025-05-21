import { AxiosInstance } from 'axios';
import { delay } from '../utils/delay';

export enum Status {
  Initializing = 'Initializing',
  AcceptingDigest = 'Accepting digest',
  Decrypting = 'Decrypting',
  Deinitializing = 'Deinitializing',
  Completed = 'Completed',
}

export const checkClaimStatus = async (client: AxiosInstance, link: string) => {
  let currentStatus: Status = Status.Initializing;
  try {
    while (currentStatus !== Status.AcceptingDigest) {
      const {
        data: { status },
      } = await client.get(`${link}`);
      console.log('rcw status', status);
      currentStatus = status as Status;
      await delay(2000);
    }
  } catch (error) {
    console.log('checkClaimStatus error: ', error);
    throw error;
  }
};
