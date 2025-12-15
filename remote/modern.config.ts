import { appTools, defineConfig } from '@modern-js/app-tools';
import { container } from '@rspack/core';

const { ModuleFederationPlugin } = container;

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
    port: 8081,
    ssr: {
      mode: 'stream',
    },
  },
  dev: {
    port: 8081,
  },
  tools: {
    rspack(_config, { appendPlugins }) {
      appendPlugins(
        new ModuleFederationPlugin({
          name: 'remote',
          filename: 'remoteEntry.js',
          exposes: {
            './UserInfo': './src/components/UserInfo.tsx',
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
