import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

// yaml配置文件
const YAML_CONFIG_FILENAME = 'application.yml';

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
