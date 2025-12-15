import { moduleFederationPlugin } from '@module-federation/modern-js';

const remoteBaseUrl = process.env.REMOTE_BASE_URL ?? 'http://localhost:8081';

const sharedDependencies = {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
};

export default moduleFederationPlugin({
  config: {
    name: 'host',
    remotes: {
      remote: `remote@${remoteBaseUrl}/remoteEntry.js`,
    },
    shared: sharedDependencies,
  },
});
