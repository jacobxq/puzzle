var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css'); // css压缩
// var concat = require('gulp-concat'); // 文件合并
var rename = require('gulp-rename'); // 文件更名
var uglify = require('gulp-uglify'); // js压缩
var eslint = require('gulp-eslint'); // eslint代码规范检测

var paths = {
  css: ['./src/css/*.scss'],
  js: ['./src/js/**/*.js']
};

gulp.task('css', function () {
  return gulp.src(paths.css)
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['Firefox > 20', 'ie 8', 'last 2 versions'],
    cascade: true
  }))
  // .pipe(rename({ suffix: '.min' }))
  .pipe(cleancss({compatibility: 'ie8'}))
  .pipe(gulp.dest('./static/css'));
});

gulp.task('js', function () {
  return gulp.src(paths.js)
  .pipe(eslint())
  .pipe(eslint.format())
  // .pipe(babel())
  // .pipe(uglify())
  .pipe(gulp.dest('./static/js'))
})


// 默认任务
gulp.task('dev', function () {
  gulp.watch(paths.css, ['css']);
  gulp.watch(paths.js, ['js']);
});

gulp.task('server', function () {
  gulp.run(['js', 'css']);
});
