module.exports = function (grunt) {

    const sass = require('node-sass');

    grunt.initConfig({

        settings: {
            srcPath: 'src/',
            distPath: 'dist/',
            library: 'jPopup'
        },

        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: ['<%= settings.srcPath %>js/index.js']
        },

        stylelint: {
            options: {
                configFile: '.stylelintrc'
            },
            all: ['<%= settings.srcPath %>scss/**/*.scss']
        },

        babel: {
            dist: {
                files: {
                    '<%= settings.distPath %>js/index.js': [
                        '<%= settings.srcPath %>js/index.js'
                    ]
                }
            }
        },

        uglify: {
            minify: {
                options: {
                    beautify: false
                },
                files: {
                    '<%= settings.distPath %>js/index.min.js': [
                        '<%= settings.distPath %>js/index.js'
                    ]
                }
            }
        },

        umd: {
            all: {
                options: {
                    src: '<%= settings.distPath %>js/index.js',
                    dest: '<%= settings.distPath %>js/index.js',
                    objectToExport: '<%= settings.library %>',
                }
            }
        },

        sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>scss',
                    src: ['**/*.scss'],
                    dest: '<%= settings.distPath %>css',
                    ext: '.css'
                }],
                options: {
                    implementation: sass,
                    outputStyle: 'expanded',
                    sourceMap: false,
                    precision: 5
                }
            }
        },

        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: '<%= settings.distPath %>css/**/*.css'
            }
        },

        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.distPath %>css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= settings.distPath %>css',
                    ext: '.min.css'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>',
                    src: ['**/*.html'],
                    dest: '<%= settings.distPath %>'
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                background: true,
                singleRun: false,
                files: [
                    { src: ['<%= settings.srcPath %>js/index.js'], served: true, included: true, type: 'module' },
                    { src: ['test/index.js'], served: true, included: true, type: 'module' },
                ]
            }
        },

        browserSync: {
            bsFiles: {
                src : [
                    '<%= settings.distPath %>'
                ],
            },
            options: {
                server: {
                    baseDir: '<%= settings.distPath %>'
                }
            }
        },

        watch: {
            javascript: {
                expand: true,
                files: ['<%= settings.srcPath %>js/**/*.js'],
                tasks: ['eslint', 'babel', 'umd', 'uglify'],
                options: {
                    spawn: false
                }
            },
            scss: {
                expand: true,
                files: ['<%= settings.srcPath %>scss/**/*.scss'],
                tasks: ['stylelint', 'sass', 'postcss', 'cssmin'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['<%= settings.srcPath %>*.html'],
                tasks: ['htmlmin'],
                options: {
                    spawn: false
                }
            },
            browserSync: {
                files: ['<%= settings.distPath %>'],
                tasks: ['browserSync'],
                options: {
                    spawn: false
                }
            },
            karma: {
                tasks: ['karma:unit:start'],
                files: ['<%= settings.srcPath %>js/index.js', 'test/index.js']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch', 'browserSync']);
    grunt.registerTask('build', [
        'eslint', 'stylelint',
        'babel', 'umd', 'uglify',
        'sass', 'postcss', 'cssmin',
        'htmlmin'
    ]);

};
