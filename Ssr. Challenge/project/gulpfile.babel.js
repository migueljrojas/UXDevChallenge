// Importing functions from gulp API and gulp plugins for project output
import { src, dest, watch, series, parallel } from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import imageMin from 'gulp-imagemin';
import babel from 'rollup-plugin-babel';
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

// File paths
const files = { 
    stylesPath: 'src/styles/**/*.scss',
    scriptsPath: 'src/scripts/main.js',
    imagesPath: 'src/images/**/*',
    htmlPath: 'src/**/*.pug'
}

// Styles task: compiles the style.scss file into style.css and minifies the result
export const stylesTask = () => src(files.stylesPath)
    .pipe(sourcemaps.init()) // creates sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS
    .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
    .pipe(dest('./dist/styles')) // put final CSS in dist folder
    .pipe(browserSync.stream()); // update changes with browser sync

// Scripts task: concatenates and uglifies JS files to script.js
export const scriptsTask = () => rollup({
    entry: files.scriptsPath,
    format: 'umd',
    sourcemap: true,
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env']
      })
    ]
  })
    .pipe(source('main.js', './src/scripts'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/scripts'))
    .pipe(browserSync.stream());

// Images task: gather and minifies image assets
export const imagesTask = () => src(files.imagesPath)
    .pipe(imageMin())
    .pipe(dest('./dist/images'));

// Html task: compiles pug files into html
export const htmlTask = () => src(files.htmlPath, {
    ignore: [
      '**/\_*',
      '**/\_*/**'
    ]
  })
    .pipe(pug())
    .pipe(dest('./dist'))
    .pipe(browserSync.stream());

//Watch task to automatically apply new changes to source files
export const watchTask = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  watch([
    files.stylesPath,
    files.scriptsPath,
    files.imagesPath,
    files.htmlPath
  ], parallel(stylesTask, scriptsTask, imagesTask, htmlTask));
}

export default series(
  parallel(stylesTask, scriptsTask, imagesTask, htmlTask),
  watchTask
);
