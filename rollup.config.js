// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',                // point d’entrée de votre module
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',                     // ES module
      sourcemap: true
    },
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',                    // CommonJS pour require()
      exports: 'auto',
      sourcemap: true
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',                    // UMD pour <script> / CDN
      name: 'ThresholdChart',           // nom global exposé sur window.ThresholdChart
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),                         // Résout les imports depuis node_modules
    commonjs(),                        // Convertit CommonJS -> ES modules
    postcss({
      extract: true,                   // Extrait le CSS dans dist/style.css
      minimize: true,                  // Minifie le CSS
      sourceMap: true
    }),
    terser()                           // Minifie le JS
  ]
};
