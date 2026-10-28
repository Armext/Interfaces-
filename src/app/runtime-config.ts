export interface AgroCampoRuntimeConfig {
  primeUiLicense?: string;
}

declare global {
  var __AGROCAMPO_RUNTIME_CONFIG__: AgroCampoRuntimeConfig | undefined;
}

export function setAgroCampoRuntimeConfig(config: AgroCampoRuntimeConfig): void {
  globalThis.__AGROCAMPO_RUNTIME_CONFIG__ = config;
}

export function getAgroCampoRuntimeConfig(): AgroCampoRuntimeConfig {
  return globalThis.__AGROCAMPO_RUNTIME_CONFIG__ ?? {};
}
