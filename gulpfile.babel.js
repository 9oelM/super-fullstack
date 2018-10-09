const gulp = require('gulp');
const run = require('gulp-run-command').default;
const prettier = require('gulp-prettier');
const eslint = require('gulp-eslint');
const prettierrc = require('./.prettierrc');
const eslintrc = require('./.eslintrc');
/*
    customize your paths to get it working.
*/
const paths = {
  js: ['./client/**/*.js','./server/**/*.js']
}

const format = () => gulp
    .src(paths.js, { base: '.', since: gulp.lastRun(format) })
    .pipe(prettier(prettierrc))
    .pipe(gulp.dest('.'))


const lint = () => gulp
    .src(paths.js, { base: '.', since: gulp.lastRun(lint) })
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(eslint(eslintrc))
  // eslint.format() outputs the lint results to the console.
  // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
  // To have the process exit with an error code (1) on
  // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())

const dev = () => run("npm run dev")()

const build = () => run("npm run build")()
/*
    generic functions
*/

function watch() {
  const watchers = [gulp.watch(paths.js, format), gulp.watch(paths.js, lint)]
  watchers.forEach(watcher => watcher.on('change', (path, stats) => {
    console.log(`${path} was changed`);
  }))
}

/*
    tasks
*/
exports.watch = watch
exports.dev = dev()
exports.build = gulp.series(format, lint, build)
exports.default = gulp.parallel(watch)