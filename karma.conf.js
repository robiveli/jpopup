module.exports = function (config) {
    
    'use strict';

    config.set({

        frameworks: ['mocha', 'chai', 'sinon'],

        files: [
            'https://code.jquery.com/jquery-2.2.4.min.js', 
            
            'dist/js/*.js',
            'test/*.js'
        ],

        reporters: ['mocha', 'coverage'],

        port: 9876,
        autoWatch: false,
        singleRun: true,

        preprocessors: {
            'src/js/*.js': 'coverage'
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

        browsers: ['PhantomJs']

    });
    
};