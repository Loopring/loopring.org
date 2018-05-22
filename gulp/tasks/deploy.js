module.exports = ({ gulp, config, ghPages }) => {
    gulp.task('deploy', () => {
        return gulp.src(['./dist/**/*', 'assets/CNAME'])
            .pipe(ghPages());
    });
};