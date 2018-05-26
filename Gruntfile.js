module.exports = function(grunt) {

	const browsersList = grunt.file.readJSON('./package.json').browserslist;

    grunt.initConfig({

        settings: {
            srcPath: 'src/',
            distPath: 'dist/',
            library: 'jPopup'
        },

        babel: {
            dist: {
                files: {
                    '<%= settings.distPath %>js/<%= settings.library %>.js': [
                        '<%= settings.srcPath %>js/<%= settings.library %>.js'
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
                    '<%= settings.distPath %>js/<%= settings.library %>.min.js': [
                        '<%= settings.distPath %>js/<%= settings.library %>.js'
                    ]
                }
            }
        },

        umd: {
            all: {
                options: {
                    src: '<%= settings.distPath %>js/<%= settings.library %>.js',
                    dest: '<%= settings.distPath %>js/<%= settings.library %>.js',
                    objectToExport: '<%= settings.library %>',
                }
            }
		},

		sass: {
            app: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.srcPath %>sass',
                    src: ['**/*.scss'],
                    dest: '<%= settings.distPath %>css',
                    ext: '.css'
                }],
                options: {
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
                    require('autoprefixer')({
						browsers: browsersList
					})
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

        watch: {
            javascript: {
                expand: true,
                files: ['<%= settings.srcPath %>js/**/*.js'],
                tasks: ['babel', 'umd', 'uglify'],
                options: {
                    spawn: false
                }
			},
			scss: {
                expand: true,
                files: ['<%= settings.srcPath %>sass/**/*.scss'],
                tasks: ['sass', 'postcss', 'cssmin'],
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
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [ 'babel', 'umd', 'uglify', 'sass', 'postcss', 'cssmin', 'htmlmin']);

};