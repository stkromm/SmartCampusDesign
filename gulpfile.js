var gulp = require('gulp');
var styleguide = require('sc5-styleguide');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var outputPath = 'styleguide';

gulp.task('styleguide:generate', function () {
    return gulp.src('src/stylesheets/**/*.scss')
        .pipe(styleguide.generate({
            title: 'SmartCampus Styleguide',
            server: true,
            disableEncapsulation: true,
            extraHead: [
                '<script src="../bower_components/jquery/dist/jquery.min.js"></script>',
                '<script src="../dist/smartcampus-ui.js"></script>'],
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

gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);

gulp.task('watch', ['styleguide'], function () {
    // Styleguide automatically detects existing server instance
    gulp.watch(['*.scss'], ['styleguide']);
});


gulp.task('build', function () {
    gulp.src(['src/javascripts/components/tooltip.js','src/javascripts/components/*.js'])

        .pipe(babel())
        .pipe(concat('smartcampus-ui.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(uglify())
        .pipe(concat('smartcampus-ui.min.js'));

    gulp
        .src('src/stylesheets/smartcampus-ui.css')
        .pipe(gulp.dest('dist'));
});