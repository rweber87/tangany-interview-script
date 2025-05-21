import { AxiosInstance } from 'axios';

export const encryptedData = async (
  client: AxiosInstance
): Promise<{ payload: string; key: string; link: string }> => {
  const { data } = await client.get('/claim');
  const processName: string = data?.resources.key.name;
  const processClaim: string = data?.resources.claim;
  const processLink: string = data?.links[0].href;
  console.log('rcw claim', data, processName, processClaim);

  return { payload: processClaim, key: processName, link: processLink };
};
