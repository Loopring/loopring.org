module.exports = ({gulp}) => {
    gulp.task('prod', gulp.series(
        'clean',
        gulp.parallel('fonts', 'htmlimport', 'scss', 'images', 'resources', 'script')
        // gulp.sparallel('fonts', 'htmlimport', 'scss', 'resources', 'script')
    ))
};