const AWS_PROVIDER = 'aws';
const PROVIDERS = {
  aws: AWS_PROVIDER,
};

function providerKeys() {
  return Object.keys(PROVIDERS)
}

function validProvider(provider) {
  return PROVIDERS[provider] != null
}

export default PROVIDERS;
export {
  AWS_PROVIDER,
  PROVIDERS,
  providerKeys,
  validProvider,
}