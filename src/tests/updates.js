import {check, group} from 'k6';
import {SharedArray} from 'k6/data';
import {threshold} from '../config/thresholds.js';
import {workload} from '../config/workloads.js';
import {htmlReport} from '../libs/k6-reporter-2.3.0.js';
import * as service from '../requests/import-notifications.js';
import * as oauth from '../requests/oauth.js';

export const options = {
  scenarios: {
    workload,
  },
  thresholds: threshold,
};

const testData = new SharedArray('import notifications', function () {
  return JSON.parse(
    open('../data/import-notifications.json')
  ).importNotifications;
});

export function setup() {
  const tokenUrl = __ENV.TEST_CLIENT_LOGIN_URL;
  const clientId = __ENV.TEST_CLIENT_APP_ID;
  const clientSecret = __ENV.TEST_CLIENT_SECRET;

  return oauth.getAccessToken(tokenUrl, clientId, clientSecret);
}

export default function (accessToken) {
  group('PHA import notifications updates', function () {
    const bcp = 'GBTEEP1';
    const from = '2025-01-07T10:21:28.3970000Z';
    const to = '2025-01-07T10:21:38.3970000Z';

    const response = service.getUpdates(accessToken, bcp, from, to);

    check(response, {
      'is status 200': (r) => r.status === 200,
      'has import notifications': (r) =>
        r.json().hasOwnProperty('importNotifications'),
    });

    // Results in 14 requests, the target (average) is 13.175859517
    for (const importNotification of testData) {
      const response = service.getImportNotification(
        accessToken,
        importNotification.referenceNumber
      );

      check(response, {
        'is status 200': (r) => r.status === 200,
        'verify reference number': (r) =>
          r.json().referenceNumber === importNotification.referenceNumber,
      });
    }
  });
}

export function handleSummary(data) {
  return {
    'index.html': htmlReport(data),
  };
}
