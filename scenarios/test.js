import http from 'k6/http';
import {check} from 'k6';
import {htmlReport} from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js';

export const options = {
  thresholds: {
    http_req_duration: ['p(90)<2500'],
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/hello/world`);

  check(res, {
    'is status 200': (r) => r.status === 200,
    'verify response text': (r) => r.json(['response']) === 'Hello World',
  });
}

export function handleSummary(data) {
  return {
    'index.html': htmlReport(data),
  };
}
