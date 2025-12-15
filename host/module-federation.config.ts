import { moduleFederationPlugin } from '@module-federation/modern-js';

const remoteBaseUrl = process.env.REMOTE_BASE_URL ?? 'http://localhost:8081';
const serverRemoteEntry =
  process.env.REMOTE_SSR_ENTRY ?? `${remoteBaseUrl}/bundles/remoteEntry.js`;

const sharedDependencies = {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
};

const baseConfig = {
  name: 'host',
  remotes: {
    remote: `remote@${remoteBaseUrl}/remoteEntry.js`,
  },
  shared: sharedDependencies,
  runtimePlugins: [
    [
      require.resolve('./mf-runtime-plugins/resolve-ssr-remote-entry'),
      { ssrEntry: serverRemoteEntry },
    ] as [string, Record<string, unknown>],
  ],
};

export default moduleFederationPlugin({
  config: baseConfig,
});
