import { get } from 'env-var';

export default () => ({
  api: {
    etherscan: {
      key: get('API_ETHERSCAN_KEY').asString(),
      url: get('API_ETHERSCAN_URL').asString(),
    },
  },
  app: {
    port: get('APP_PORT').asPortNumber(),
  },
});
