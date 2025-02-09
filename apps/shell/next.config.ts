import withModuleFederation from '@module-federation/nextjs-mf';
import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config: Configuration, options: any) => {
    config.plugins!.push(
      new withModuleFederation({
        name: 'shell',
        filename: 'remoteEntry.js',
        library: { type: 'var', name: 'shell' },
        remotes: {
          remote1: 'remote1@http://localhost:4201/_next/static/chunks/remoteEntry.js',
          remote2: 'remote2@http://localhost:4202/_next/static/chunks/remoteEntry.js',
        },
        extraOptions: {},
      })
    );
    return config;
  },
};

export default nextConfig;