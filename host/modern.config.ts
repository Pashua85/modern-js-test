import { appTools, defineConfig } from '@modern-js/app-tools';
import { container } from '@rspack/core';

const { ModuleFederationPlugin } = container;

const remoteBaseUrl = process.env.REMOTE_BASE_URL ?? 'http://localhost:8081';
const sharedDependencies = {
  react: { singleton: true, eager: true, requiredVersion: false },
  'react-dom': { singleton: true, eager: true, requiredVersion: false },
};

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  runtime: {
    router: true,
  },
  server: {
    port: 8080,
    ssr: {
      mode: 'stream',
    },
  },
  dev: {
    port: 8080,
  },
  tools: {
    rspack(_config, { appendPlugins }) {
      appendPlugins(
        new ModuleFederationPlugin({
          name: 'host',
          remotes: {
            remote: `remote@${remoteBaseUrl}/remoteEntry.js`,
          },
          shared: sharedDependencies,
        }),
      );
    },
  },
  plugins: [
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
});
