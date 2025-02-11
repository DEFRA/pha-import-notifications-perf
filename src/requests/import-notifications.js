import http from 'k6/http';
import {URLSearchParams} from '../libs/k6-url-1.0.0.js';

const targetUrl = `${__ENV.K6_TARGET_URL}/import-notifications`;

export function getUpdates(accessToken, bcp, from, to) {
  const searchParams = new URLSearchParams([
    ['bcp', bcp],
    ['from', from],
    ['to', to],
  ]);

  const url = `${targetUrl}?${searchParams.toString()}`;

  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return http.get(url, params);
}

export function getImportNotification(accessToken, referenceNumber) {
  const url = `${targetUrl}/${referenceNumber}`;

  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return http.get(url, params);
}
