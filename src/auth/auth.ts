import { ClientCredentials } from 'simple-oauth2';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const client = new ClientCredentials({
  client: {
    id: process.env.CLIENTID as string, // todo: replace me
    secret: process.env.CLIENTSECRET as string, // todo: replace me
  },
  auth: {
    tokenHost: 'https://login.microsoftonline.com', // static
    tokenPath: '/50811143-5dac-46d6-92e0-3f954e222f9f/oauth2/v2.0/token', // static
  },
});

export const instance = async () => {
  // get token
  const {
    token: { access_token },
  } = await client.getToken({
    scope: 'api://d74ba222-2cc7-479c-ab62-68865807e8e0/.default', // static
  });

  console.log('rcw access_token', access_token); // eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmVgw...

  // From here on use any HTTP library to your liking to interact with the API. The following code is just an example how the access_token could be utilized using an axios instance:
  const instance = axios.create({
    baseURL: process.env.BASE_URL as string,
    headers: {
      Authorization: `Bearer ${access_token}`, // Pass bearer token to the authorization header
    },
  });

  return instance;
};
