module.exports = function (config) {

    'use strict';

    config.set({

		frameworks: ['mocha', 'chai', 'sinon'],
		plugins: [
			'karma-mocha',
			'karma-chai',
			'karma-sinon',
			'karma-coverage',
			'karma-phantomjs-launcher',
			'karma-mocha-reporter',
			'karma-babel-preprocessor'
		],

        files: [
            'https://code.jquery.com/jquery-2.2.4.min.js',
			'node_modules/@babel/polyfill/dist/polyfill.js',

            'src/js/*.js',
            'test/*.js'
        ],

        reporters: ['mocha', 'coverage'],

        port: 9876,
        autoWatch: false,
        singleRun: true,

        preprocessors: {
			'src/js/*.js': 'coverage',
			'src/js/*.js': ['babel'],
			'test/*.js': ['babel']
        },

        coverageReporter: {
            type : 'html',
            dir : 'coverage/',
            subdir: 'report',
            reporters: [
                { type: 'html' },
                { type: 'text-summary' }
            ],
            includeAllSources: true,
            watermarks: {
                statements: [50, 90],
                functions: [50, 90],
                branches: [50, 90],
                lines: [50, 90]
            }
		},

		babelPreprocessor: {
			options: {
			  	presets: ['env'],
			  	sourceMap: 'inline'
			}
		},

        browsers: ['PhantomJS']

    });

};