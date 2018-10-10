const gulp = require('gulp'),
      run = require('gulp-run-command').default,
      prettier = require('gulp-prettier'),
      eslint = require('gulp-eslint'),
      nodemon = require('gulp-nodemon'),
      prettierrc = require('./.prettierrc'),
      eslintrc = require('./.eslintrc')
/*
    customize your paths to get it working.
*/
const paths = {
  js: ['./client/**/*.js','./server/**/*.js']
}
const ports = {
  FRONT_PORT:  process.env.FRONT_PORT || '8080',
  BACK_PORT: process.env.BACK_PORT || '8081' 
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
  //  .pipe(eslint.failAfterError()) --> commented out because it can cause error to the next gulp task that receives error code

const frontDev = run(`parcel -p ${ports.FRONT_PORT} client/index.html`)

const backDev = () => {
  nodemon({
    script: './server/index.js',
    ext: 'js',
    env: { 
    NODE_ENV: 'development',
    BACK_PORT: ports.BACK_PORT
    }
  })
  .on('start', ()=> {
    console.log(`nodemon started`)
  })
  .on('crash',()=>{
    console.log(`nodemon crashed`)
  })
}

const build = run(`NODE_ENV=production parcel -p ${ports.FRONT_PORT} build client/index.html --out-dir build`)

const watch = () => {
  const watchers = [gulp.watch(paths.js, format), gulp.watch(paths.js, lint)]
  watchers.forEach(watcher => watcher.on('change', (path, stats) => {
    console.log(`${path} was changed`);
  }))
}


/*
    tasks
*/
exports.watch = watch
exports.frontDev = frontDev
exports.backDev = backDev
exports.dev = gulp.parallel(frontDev, backDev)
exports.build = gulp.series(format, lint, build)
exports.default = gulp.parallel(frontDev)