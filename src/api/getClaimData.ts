import { AxiosInstance } from 'axios';

export const getClaimData = async (
  client: AxiosInstance
): Promise<{ payload: string; key: string; link: string }> => {
  try {
    const { data } = await client.get('/claim');
    const processName: string = data?.resources.key.name;
    const processClaim: string = data?.resources.claim;
    const processLink: string = data?.links[0].href;
    console.log('rcw claim', data, processName, processClaim);

    return { payload: processClaim, key: processName, link: processLink };
  } catch (error) {
    console.log('getClaim error: ', error);
    throw error;
  }
};
