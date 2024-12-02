# pha-import-notifications-perf

Performance tests for PHA import notifications.

## Tests

### Build

Build as follows:

```bash
docker build . -t my-performance-tests
```

### Run

Run as follows:

```bash
docker run \
  -e S3_ENDPOINT='http://host.docker.internal:4566' \
  -e RESULTS_OUTPUT_S3_PATH='s3://my-bucket' \
  -e AWS_ACCESS_KEY_ID='test' \
  -e AWS_SECRET_ACCESS_KEY='test' \
  -e AWS_SECRET_KEY='test' \
  -e AWS_REGION='eu-west-2' \
  -e BASE_URL='http://host.docker.internal:8080' \
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
