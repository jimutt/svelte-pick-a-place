import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;
const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, m => m.toUpperCase())
  .replace(/-\w/g, m => m[1].toUpperCase());

export default {
  input: !production ? 'src/main.js' : 'src/components/components.module.js',
  output: !production
    ? {
        sourcemap: true,
        format: 'iife',
        name: name,
        file: 'public/bundle.js'
      }
    : [
        { file: 'dist/index.min.mjs', format: 'es' },
        { file: 'dist/index.min.js', format: 'umd', name },
        { file: 'dist/pick-a-place.min.js', format: 'iife', name }
      ],
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        production ? css.write('dist/pick-a-place.css') : css.write('public/bundle.css');
      }
    }),

    resolve(),
    commonjs(),

    !production && livereload('public'),

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
