import {check} from 'k6';
import encoding from 'k6/encoding';
import http from 'k6/http';

export function getAccessToken(tokenUrl, clientId, clientSecret) {
  const url = `${tokenUrl}/oauth2/token`;

  const body = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  const encodedCredentials = encoding.b64encode(`${clientId}:${clientSecret}`);

  const params = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };

  const response = http.post(url, body, params);

  console.log(response);

  check(response, {
    'is status 200': (r) => r.status === 200,
    'has access token': (r) => r.json().hasOwnProperty('access_token'),
  });

  return response.json().access_token;
}
