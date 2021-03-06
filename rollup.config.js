import path from 'path'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import builtinModules from 'builtin-modules'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

const plugins = [
  json({ preferConst: true }),
  nodeResolve({ mainFields: ['module', 'jsnext:main', 'main'] }),
  commonjs(),
  typescript({ resolveJsonModule: false }),
  !process.env.ROLLUP_WATCH && terser(),
]

const sourcemap = !!process.env.ROLLUP_WATCH

export default [
  {
    external: [...Object.keys(pkg.dependencies), ...builtinModules, 'vscode'],
    input: `src/${path.basename(pkg.main, '.js')}.ts`,
    output: { exports: 'named', file: pkg.main, format: 'cjs', sourcemap },
    plugins,
  },
  {
    input: 'preview.js',
    output: { file: 'lib/preview.js', format: 'iife', sourcemap },
    plugins,
  },
]
