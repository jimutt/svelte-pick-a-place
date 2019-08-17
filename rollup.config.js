import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';

const ie11Build = process.env.PAP_LEGACY_BUILD;

const production = !process.env.ROLLUP_WATCH;

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

const prodOutput = [];
if (ie11Build) {
  prodOutput.push({ file: 'dist/pick-a-place-legacy.min.js', format: 'iife', name });
} else {
  prodOutput.push(
    { file: 'dist/index.min.mjs', format: 'es' },
    { file: 'dist/index.min.js', format: 'umd', name },
    { file: 'dist/pick-a-place.min.js', format: 'iife', name }
  );
}

export default {
  input: !production ? 'src/main.js' : 'src/components/components.module.js',
  output: !production
    ? {
        sourcemap: true,
        format: 'iife',
        name: name,
        file: 'public/bundle.js'
      }
    : prodOutput,
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        production ? css.write('dist/pick-a-place.css') : css.write('public/bundle.css');
      }
    }),

    resolve(),
    commonjs(),

    !production && livereload('public'),

    ie11Build &&
      babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**', 'node_modules/core-js/**'],
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 1.5%, IE 11, not dead',
              useBuiltIns: 'usage',
              corejs: 3
            }
          ]
        ],
        plugins: []
      }),
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
