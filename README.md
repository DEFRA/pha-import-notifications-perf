# pha-import-notifications-perf

Performance tests for PHA import notifications service.

## Pre-requisites

### Environment variables

Environment variables must be set as follows:

- `K6_TARGET_URL` is the URL of the service.
- `K6_WORKLOAD` is the target workload. Available values are smoke (default), load, stress, spike.
- `K6_THRESHOLD` is the target threshold. Available values are low (default), medium or high.
- `TEST_CLIENT_LOGIN_URL` is the authentication URL.
- `TEST_CLIENT_APP_ID` is the allocated client id.
- `TEST_CLIENT_SECRET` is the allocated client secret.

## Usage

### Local

Run as follows:

```bash
k6 run src/tests/updates.js --summary-export=summary.json
```

### Build

Build as follows:

```bash
docker build . -t my-performance-tests
```

Run as follows:

```bash
docker run \
  -e S3_ENDPOINT='http://host.docker.internal:4566' \
  -e RESULTS_OUTPUT_S3_PATH='s3://my-bucket' \
  -e AWS_ACCESS_KEY_ID='test' \
  -e AWS_SECRET_ACCESS_KEY='test' \
  -e AWS_SECRET_KEY='test' \
  -e AWS_REGION='eu-west-2' \
  -e TEST_CLIENT_LOGIN_URL='<value>' \
  -e TEST_CLIENT_APP_ID='<value>' \
  -e TEST_CLIENT_SECRET='<value>' \
  my-performance-tests
```

## License

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
