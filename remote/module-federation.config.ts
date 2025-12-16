import { moduleFederationPlugin } from '@module-federation/modern-js';

const sharedDependencies = {
  react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true },
};

export default moduleFederationPlugin({
  config: {
    name: 'remote',
    filename: 'remoteEntry.js',
    exposes: {
      './UserName': './src/components/UserName.tsx',
    },
    shared: sharedDependencies,
  },
});
