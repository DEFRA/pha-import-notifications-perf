FROM grafana/k6:latest

ENV TZ="Europe/London"

USER root

RUN apk add --no-cache \
   aws-cli \
   bash \
   curl

USER k6

WORKDIR /opt/perftest

COPY scenarios/ ./scenarios/
COPY entrypoint.sh .

ENV S3_ENDPOINT=https://s3.eu-west-2.amazonaws.com
ENV TEST_SCENARIO=test

ENTRYPOINT [ "./entrypoint.sh" ]
