import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'], 
  outDir: 'build',
  format: ['cjs'], 
  target: 'node18',
  clean: true,
  external: ['./src/db/*.db']
})