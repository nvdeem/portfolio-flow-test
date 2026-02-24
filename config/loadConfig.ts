import fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

export type TestConfig = {
  baseUrl: string;
  username: string;
  password: string;
  expectedPortfolioValue: number;
  currencySymbol: string;
};

const DEFAULT_CONFIG_PATH = path.resolve(process.cwd(), 'config', 'env.local.yaml');

export function loadConfig(configPath = process.env.TEST_CONFIG_PATH ?? DEFAULT_CONFIG_PATH): TestConfig {
  // We fail fast here so test errors are obvious when config is missing.
  if (!fs.existsSync(configPath)) {
    throw new Error(`Config not found at "${configPath}". Copy config/env.example.yaml to config/env.local.yaml.`);
  }

  // Parse the YAML once, then validate required fields in a simple way.
  const parsed = parse(fs.readFileSync(configPath, 'utf8')) as Partial<TestConfig> | null;

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Config file must be a YAML object.');
  }

  const { baseUrl, username, password, expectedPortfolioValue, currencySymbol } = parsed;

  if (!baseUrl || !username || !password || !currencySymbol) {
    throw new Error('Config is missing one of: baseUrl, username, password, currencySymbol.');
  }

  if (typeof expectedPortfolioValue !== 'number' || Number.isNaN(expectedPortfolioValue)) {
    throw new Error('Config field "expectedPortfolioValue" must be a number (example: 0.00).');
  }

  return { baseUrl, username, password, expectedPortfolioValue, currencySymbol };
}
