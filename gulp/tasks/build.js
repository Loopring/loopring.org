module.exports = ({gulp}) => {
    gulp.task('build', gulp.series(
        'clean',
        gulp.parallel('fonts', 'htmlimport', 'scss', 'images',)
        // gulp.sparallel('fonts', 'htmlimport', 'scss', 'resources', 'script')
    ))
};