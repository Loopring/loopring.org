module.exports = ({gulp, config, uglify, watchify, browserify, source, buffer, sourcemaps, rename, babelify}) => {
    let isFirst = true,
        bf,
        transformOptions = {},
        workFile = config.scripts.src + config.default_js_file;

    function devBuild() {
        bf = browserify({
            entries: workFile,
            debug: true,
            cache: {},
            packageCache: {},
            fullPaths: true
        });
        bf = watchify(bf);
        transformOptions = {
            // 'presets': ['env', 'react'],
            'presets': ['env'],
            'plugins': ['transform-runtime']
        };
        bf.transform('babelify', transformOptions);
    }

    function prodBuild() {
        bf = browserify({
            entries: workFile,
            debug: false,
            cache: {},
            packageCache: {},
            fullPaths: false
        });
        transformOptions = {
            'presets': ['env'],
            'plugins': ['transform-inline-environment-variables', 'transform-runtime', 'transform-remove-console', 'transform-remove-debugger']
        };
        bf.transform('babelify', transformOptions);
    }

    function buildScript() {
        const stream = bf.bundle()
            .on('error', function (err) {
                console.log(err.toString());
                this.emit("end");
            });

        stream.pipe(source(workFile.match(/([A-z0-9-_]*).js$/g)[0]))
              .pipe(buffer())
              .pipe(sourcemaps.init({loadMaps: true}))
              .pipe(sourcemaps.write())
              .pipe(gulp.dest(config.scripts.dest));

        if(!config.isDev){
            stream.pipe(source(workFile.match(/([A-z0-9-_]*).js$/g)[0]))
                  .pipe(buffer())
                  .pipe(sourcemaps.init({loadMaps: true}))
                  .pipe(uglify())
                  .pipe(sourcemaps.write('./'))
                  .pipe(rename({suffix: '.min'}))
                  .pipe(gulp.dest(config.scripts.dest));
        }

        return stream;
    }

    gulp.task('script', () => {
        if(config.isDev && isFirst){
            isFirst = false;
            devBuild();
        }else if(!config.isDev){
            prodBuild();
        }
        return buildScript();
    });
};