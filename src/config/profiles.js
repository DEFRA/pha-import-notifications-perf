const UPDATES_RATE = 1152; // 1 (per 15 min) * 4 (in an hour) * 24 (in a day) * 12 (phas) = 1152 per day
const IMPORT_NOTIFICATION_RATE = 16128; // 14 (per 15 min) * 4 (in an hour) * 24 (in a day) * 12 (phas) = 16128 per day

const config = {
  load: {
    scenarios: {
      // 1152 (daily) iterations of the user journey (average volume of traffic), averaged over 10 mins
      updates: {
        exec: 'updates',
        executor: 'constant-arrival-rate',
        duration: '15m',
        preAllocatedVUs: __ENV.PRE_ALLOCATED_VUS || 1,
        rate: UPDATES_RATE,
        timeUnit: '1d',
      },
      // 16128 (daily) iterations of the user journey (average volume of traffic), averaged over 10 mins
      importNotification: {
        exec: 'importNotification',
        executor: 'constant-arrival-rate',
        duration: '15m',
        preAllocatedVUs: __ENV.PRE_ALLOCATED_VUS || 1,
        rate: IMPORT_NOTIFICATION_RATE,
        timeUnit: '1d',
      },
    },
    thresholds: {
      http_req_duration: ['p(90)<2500'],
      http_req_failed: ['rate<0.01'],
    },
  },
  stress: {
    scenarios: {
      // 1152 (daily) iterations of the user journey (average volume of traffic) multiplied by STRESS_FACTOR (default 100), averaged over 10 mins
      updates: {
        exec: 'updates',
        executor: 'constant-arrival-rate',
        duration: '10m',
        preAllocatedVUs: __ENV.PRE_ALLOCATED_VUS || 3,
        rate: UPDATES_RATE * (__ENV.STRESS_FACTOR || 100),
        timeUnit: '1d',
      },
      // 16128 (daily) iterations of the user journey (average volume of traffic) multiplied by STRESS_FACTOR (default 100), averaged over 10 mins
      importNotification: {
        exec: 'importNotification',
        executor: 'constant-arrival-rate',
        duration: '10m',
        preAllocatedVUs: __ENV.PRE_ALLOCATED_VUS || 3,
        rate: IMPORT_NOTIFICATION_RATE * (__ENV.STRESS_FACTOR || 100),
        timeUnit: '1d',
      },
    },
    thresholds: {
      http_req_duration: ['p(90)<2500'],
      http_req_failed: ['rate<0.01'],
    },
  },
  spike: {
    scenarios: {
      // Ramp up to SPIKE_VUS (default 100) virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
      updates: {
        exec: 'updates',
        executor: 'ramping-vus',
        stages: [
          {duration: '1m', target: 1 * (__ENV.SPIKE_VUS || 100)},
          {duration: '30s', target: 0},
        ],
      },
      // Ramp up to SPIKE_VUS (default 100) virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
      importNotification: {
        exec: 'importNotification',
        executor: 'ramping-vus',
        stages: [
          {duration: '1m', target: 1 * (__ENV.SPIKE_VUS || 100)},
          {duration: '30s', target: 0},
        ],
      },
    },
    thresholds: {
      http_req_duration: ['p(90)<2500'],
      http_req_failed: ['rate<0.01'],
    },
  },
  smoke: {
    scenarios: {
      // 1 iteration of the user journey for validation purposes
      updates: {
        exec: 'updates',
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
      },
      // 1 iteration of the user journey for validation purposes
      importNotification: {
        exec: 'importNotification',
        executor: 'per-vu-iterations',
        vus: 1,
        iterations: 1,
      },
    },
    thresholds: {
      http_req_duration: ['p(90)<2500'],
      http_req_failed: ['rate<0.01'],
    },
  },
};

export const profile = config[__ENV.PROFILE] || config['smoke'];
