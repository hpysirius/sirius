import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'hpys',
  hash: true,
  devServer: {
    port: 8800,
  },
  mode: 'doc',
  resolve: {
    includes: ['./docs', './packages'],
  },
})