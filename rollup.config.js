import path          from 'path';
import resolve       from '@rollup/plugin-node-resolve';
import commonjs      from '@rollup/plugin-commonjs';
import postcss       from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import { terser }    from 'rollup-plugin-terser';

export default {
  input: 'src/js/index.js',
  output: [
    { file: 'dist/index.esm.js', format: 'es',  sourcemap: true },
    { file: 'dist/index.cjs.js', format: 'cjs', exports: 'auto', sourcemap: true },
    { file: 'dist/index.umd.js', format: 'umd', name: 'ThresholdChart', sourcemap: true }
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      extract: path.resolve(__dirname, 'dist/style.css'),
      plugins: [ postcssImport() ],
      minimize: true,
      sourceMap: true
    }),
    terser()
  ]
};
