const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const minify = require('gulp-minify');

gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('assets'));
});

gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js'],
            noSource: true,
        }))
        .pipe(gulp.dest('assets'))
});

gulp.task('watch', function() {
    gulp.watch('styles/**/*.scss', gulp.series('sass'));
    gulp.watch('js/**/*.js', gulp.series('js'));
});