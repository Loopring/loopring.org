module.exports = ({gulp, config}) => {
    gulp.task('resources', () => {
        return gulp.src(config.resources.src)
                   .pipe(gulp.dest(config.resources.dest));
    });
};
