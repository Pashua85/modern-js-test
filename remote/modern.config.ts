import { appTools, defineConfig } from '@modern-js/app-tools';
import moduleFederationPlugin from './module-federation.config';

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
  plugins: [
    moduleFederationPlugin,
    appTools({
      bundler: 'rspack', // Set to 'webpack' to enable webpack
    }),
  ],
});
