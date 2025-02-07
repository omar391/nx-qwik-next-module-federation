import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/apps/shell',
  root: 'apps/shell',
  plugins: [
    qwikCity(),
    qwikVite({
      client: {
        outDir: '../../dist/apps/shell/client',
      },
      ssr: {
        outDir: '../../dist/apps/shell/server',
      },
      tsconfigFileNames: ['tsconfig.app.json']
    }),
    tsconfigPaths({ root: '../../' })
  ],
  server: {
    fs: {
      allow: ['../../'],
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=600',
    },
  },
  build: {
    target: 'es2020',
    outDir: '../../dist/apps/shell'
  },
  optimizeDeps: {
    include: ['./src/root.tsx'],
  },
});
