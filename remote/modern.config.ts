import { appTools, defineConfig } from '@modern-js/app-tools';
import moduleFederationPlugin from './module-federation.config';

const ensureTrailingSlash = (value: string) =>
  value.endsWith('/') ? value : `${value}/`;

const remotePublicUrl = ensureTrailingSlash(
  process.env.REMOTE_PUBLIC_URL ?? 'http://127.0.0.1:8081',
);

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
  output: {
    assetPrefix: remotePublicUrl,
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
