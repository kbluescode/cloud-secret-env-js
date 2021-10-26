import { providerKeys, validProvider } from './providers.js';

const NULLABLE_FIELDS = ['profile'];

export default class Config {
  constructor() {
    this.override = false;
    this.profile = null;
    this.provider = null;
    this.region = null;
    this.secretIds = null;
  }

  validate() {
    const errors = [];

    for (const [k, v] of Object.entries(this)) {
      if (NULLABLE_FIELDS.includes(k)) {
        continue
      }

      if (v == null || v.length == 0) {
        errors.push(`${k} can't be null or empty`);
      }
    }

    if (!validProvider(this.provider)) {
      errors.push(`provider '${this.provider}' not found in [${providerKeys().join(', ')}]`);
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }
  }
}