import { fromIni } from "@aws-sdk/credential-providers";
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

import Config from './config.js'

function getEnvHandler(override) {
  if (override) {
    // set ENV var even if defined
    return (([k, v]) => process.env[k] = v);
  }
  // only set ENV var if it's null/undefined
  return (([k, v]) => {
    const field = process.env[k];
    if (field == null) {
      process.env[k] = v;
    }
  })
}

function initializeSecretClient(profile, region) {
  return new SecretsManagerClient({
    credentials: fromIni({ profile }),
    region
  });
}

class CloudSecretEnv {
  constructor() {
    this.config = null;
  }

  configure(opts = {}) {
    if (this.config == null) {
      this.config = new Config();
    }

    for (const [k, v] of Object.entries(this.config)) {
      if (opts[k] != null) {
        this.config[k] = opts[k];
      }
    }
  }

  async run() {
    this.config.validate();

    const {
      override,
      profile,
      region,
      secretIds,
    } = this.config;

    const envHandler = getEnvHandler(override);
    const client = initializeSecretClient(profile, region);
    const commands = secretIds.map((secretId) => new GetSecretValueCommand({ SecretId: secretId }));

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      const result = await client.send(command);
      const envVars = JSON.parse(result.SecretString);
      Object.entries(envVars).forEach(envHandler);
    }
    console.log('end of run!');
  }
}

export default CloudSecretEnv;