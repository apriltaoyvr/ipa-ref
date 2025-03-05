import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'g8yfhf',
  experimentalStudio: true,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
