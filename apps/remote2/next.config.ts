import withModuleFederation from '@module-federation/nextjs-mf';
import moduleFederationConfig from './module-federation.config';
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

interface WebpackOptions {
  isServer: boolean;
}

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }: WebpackOptions) => {
    config.plugins!.push(
      new withModuleFederation({
        ...moduleFederationConfig,
        filename: 'remoteEntry.js',
        library: { type: config.output?.libraryTarget ?? 'var', name: 'remote2' },
        remotes: {
          shell: 'shell@http://localhost:4200/_next/static/chunks/remoteEntry.js',
        },
        shared: {},
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;