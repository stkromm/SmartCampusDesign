var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var outputPath = 'styleguide';

gulp.task('styleguide:generate', function () {
    return gulp.src('src/stylesheets/**/*.scss')
        .pipe(styleguide.generate({
            title: 'SmartCampus Styleguide',
            server: true,
            extraHead: [
                '<script src="/bower_components/jquery/dist/jquery.min.js"></script>',
                '<script src="/dist/smartcampus-ui.js"></script>',
                '<script src="/dist/smartcampus-ui.css"]></script>'],
            rootPath: outputPath,
            overviewPath: 'overview.md'
        }))
        .pipe(gulp.dest(outputPath));
});

gulp.task('styleguide:applystyles', function () {
    return gulp.src('dist/smartcampus-ui.css')
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(outputPath));
});

gulp.task('watch', ['styleguide'], function () {
    // Start watching changes and update styleguide whenever changes are detected
    // Styleguide automatically detects existing server instance
    gulp.watch(['*.scss'], ['styleguide']);
});

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

var concat = require('gulp-concat');

gulp.task('dist', function () {
    gulp.src(['src/javascripts/components/*.js'])
        .pipe(concat('smartcampus-ui.js'))
        .pipe(gulp.dest('dist/'));
    gulp
        .src('src/stylesheets/smartcampus-ui.css')
        .pipe(gulp.dest('dist'));
});