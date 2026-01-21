import baseConfig from './playwright.config';
import { paths } from './src/utils/paths';

export default {
  ...baseConfig,
  testIgnore: ['tests/auth/**'],
  use: {
    ...baseConfig.use,
    storageState: paths.storageState,
  },
};
