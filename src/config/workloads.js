const config = {
  // 12 iterations of the user journey over 15 mins (average volume of traffic)
  load: {
    executor: 'constant-arrival-rate',
    duration: '15m',
    preAllocatedVUs: 1,
    rate: 12,
    timeUnit: '15m',
  },
  // 960 iterations of the user journey over 15 mins (80x average volume of traffic)
  stress80: {
    executor: 'constant-arrival-rate',
    duration: '15m',
    preAllocatedVUs: 50,
    rate: 960,
    timeUnit: '15m',
  },
  // 1200 iterations of the user journey over 15 mins (100x average volume of traffic)
  stress100: {
    executor: 'constant-arrival-rate',
    duration: '15m',
    preAllocatedVUs: 50,
    rate: 1200,
    timeUnit: '15m',
  },
  // 1440 iterations of the user journey over 15 mins (120x average volume of traffic)
  stress120: {
    executor: 'constant-arrival-rate',
    duration: '15m',
    preAllocatedVUs: 200,
    rate: 1440,
    timeUnit: '15m',
  },
  // 1680 iterations of the user journey over 15 mins (140x average volume of traffic)
  stress140: {
    executor: 'constant-arrival-rate',
    duration: '15m',
    preAllocatedVUs: 300,
    rate: 1680,
    timeUnit: '15m',
  },
  // Ramp up to 100 virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
  spike100: {
    executor: 'ramping-vus',
    stages: [
      {duration: '1m', target: 100},
      {duration: '30s', target: 0},
    ],
  },
  // Ramp up to 200 virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
  spike200: {
    executor: 'ramping-vus',
    stages: [
      {duration: '1m', target: 200},
      {duration: '30s', target: 0},
    ],
  },
  // Ramp up to 300 virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
  spike300: {
    executor: 'ramping-vus',
    stages: [
      {duration: '1m', target: 300},
      {duration: '30s', target: 0},
    ],
  },
  // Ramp up to 400 virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
  spike400: {
    executor: 'ramping-vus',
    stages: [
      {duration: '1m', target: 400},
      {duration: '30s', target: 0},
    ],
  },
  // Ramp up to 500 virtual users in 1 min with each virtual user completing as many iterations of the user journey as possible
  spike500: {
    executor: 'ramping-vus',
    stages: [
      {duration: '1m', target: 500},
      {duration: '30s', target: 0},
    ],
  },
  // 1 iteration of the user journey for validation purposes
  smoke: {
    executor: 'per-vu-iterations',
    vus: 1,
    iterations: 1,
  },
};

export const workload = config[__ENV.K6_WORKLOAD] || config['smoke'];
