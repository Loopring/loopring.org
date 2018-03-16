module.exports = ({gulp, config, htmlPartial}) => {
    gulp.task('htmlimport', () => {
        return gulp.src(config.markup.src)
            .pipe(htmlPartial({
                basePath: config.markup.templates,
                tagName: 'partial',
                variablePrefix: '@@'
            }))
            .pipe(gulp.dest(config.markup.dest))
    });
};

