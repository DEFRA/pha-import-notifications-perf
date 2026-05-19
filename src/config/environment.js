export const env = {
  // URL of token service, default local
  tokenUrl:
    !__ENV.ENVIRONMENT || __ENV.ENVIRONMENT === 'local'
      ? 'http://localhost:3000/token'
      : `https://pha-import-notifications-${__ENV.ENVIRONMENT_SUFFIX}.auth.eu-west-2.amazoncognito.com/oauth2/token`,
  // URL of PHA import notifications service, default local
  serviceUrl:
    !__ENV.ENVIRONMENT || __ENV.ENVIRONMENT === 'local'
      ? 'http://localhost:8080'
      : `https://pha-import-notifications.${__ENV.ENVIRONMENT}.cdp-int.defra.cloud`,
};
