/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['jest-matcher-specific-error'],
  rootDir: 'lib',
};

export default config;
