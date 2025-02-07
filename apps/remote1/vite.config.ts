import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/apps/remote1',
  root: 'apps/remote1',
  plugins: [
    qwikCity({ routesDir: './src/routes' }),
    qwikVite({
      client: {
        outDir: '../../dist/apps/remote1/client',
      },
      ssr: {
        outDir: '../../dist/apps/remote1/server',
      },
      tsconfigFileNames: ['tsconfig.app.json']
    }),
    tsconfigPaths({ root: '../../' })
  ],
  server: {
    fs: {
      allow: ['../../'],
    },
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  build: {
    target: 'es2020',
    outDir: '../../dist/apps/remote1'
  },
  optimizeDeps: {
    include: ['./src/root.tsx'],
  },
});
