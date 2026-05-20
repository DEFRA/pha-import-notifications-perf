import {env} from '../config/environment.js';
import {profile} from '../config/profiles.js';
import {referenceNumbers} from '../data/loader.js';
import {htmlReport} from '../lib/k6-reporter-3.0.4.js';
import {textSummary} from '../lib/k6-summary-0.1.0.js';
import {URLSearchParams} from '../lib/k6-url-1.0.0.js';
import {check, group} from 'k6';
import encoding from 'k6/encoding';
import http from 'k6/http';

export const options = profile;

export function setup() {
  const clientId = __ENV.CLIENT_ID;
  const clientSecret = __ENV.CLIENT_SECRET;

  const encodedCredentials = encoding.b64encode(`${clientId}:${clientSecret}`);

  const params = {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  };

  const body = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  };

  let res;

  if (!__ENV.ENVIRONMENT || __ENV.ENVIRONMENT === 'local') {
    res = http.get(env.tokenUrl);
  } else {
    res = http.post(env.tokenUrl, body, params);
  }

  check(res, {
    'is status 200': (r) => r.status === 200,
    'has access token': (r) =>
      Object.prototype.hasOwnProperty.call(r.json(), 'access_token'),
  });

  const token = res.json().access_token;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function updates(data) {
  group('get list of PHA import notification updates', function () {
    const searchParams = new URLSearchParams([
      ['bcp', 'GBTEEP1'],
      ['from', '2025-01-07T10:21:28.397Z'],
      ['to', '2025-01-07T10:21:38.397Z'],
    ]);

    const url = `${env.serviceUrl}/import-notifications?${searchParams.toString()}`;

    const res = http.get(url, {headers: data.headers});

    check(res, {
      'is status 200': (r) => r.status === 200,
      'response contains import notifications': (r) =>
        Object.prototype.hasOwnProperty.call(r.json(), 'importNotifications'),
    });
  });
}

export function importNotification(data) {
  group('get a single PHA import notification', function () {
    const referenceNumber =
      referenceNumbers[Math.floor(Math.random() * referenceNumbers.length)];

    const url = `${env.serviceUrl}/import-notifications/${referenceNumber}`;

    const res = http.get(url, {headers: data.headers});

    check(res, {
      'is status 200': (r) => r.status === 200,
      'response contains specified reference number': (r) =>
        r.json().referenceNumber === referenceNumber,
    });
  });
}

export function handleSummary(data) {
  return {
    './reports/index.html': htmlReport(data),
    './reports/summary.json': JSON.stringify(data),
    stdout: textSummary(data, {indent: ' ', enableColors: true}),
  };
}
