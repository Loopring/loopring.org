module.exports = ({gulp, tojson, bs}) => {
    tojson();
    function serve(done) {
        bs.init({
            server: './',
            notify: false,
            logFileChanges: false,
        });
        done();
    }
    gulp.task('dev', gulp.parallel(serve, 'htmlimport', 'scss', 'images', 'resources', 'script', 'watch'));
    // gulp.task('dev', gulp.parallel(serve, 'htmlimport', 'scss', 'resources', 'script', 'watch'));
};