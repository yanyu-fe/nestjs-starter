import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as process from 'process';
import { LoadConfig } from '@/utils/config';
const getFileName = () => {
  const env = process.env.NODE_ENV ?? 'dev';
  return `/env/.${env}.yaml`;
};
export const loadConfig = () => {
  return yaml.load(
    readFileSync(join(process.cwd(), getFileName()), 'utf8'),
  ) as LoadConfig;
};
