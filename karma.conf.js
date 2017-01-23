const path = require('path');

const webpackConfig = require('./webpack.config.test');
//In order for coverage we need to pass an environment variable
var browser = 'true' === process.env.browser;
const coverage = 'true' === process.env.coverage;

module.exports = function(config){
    var _config = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            { pattern: './karma-shim.js',watched: false }
        ],
        exclude: [],
        preprocessors: {
            './karma-shim.js': ['webpack','sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true //Don't spam the console when running in karma
        },
        reporters: ['mocha','trx'],
        trxReporter: { outputFile: 'test-results.trx', shortTestName: false },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        singleRun: false
    };

    if(browser)
        _config.browsers = ['Chrome'];
    else{
        {
            _config.browsers = ['PhantomJS'];
            _config.captureTimeout = 60000;
            _config.browserNoActivityTimeout = 30000;
            // _config.browsers = ['Chrome_travis_ci'];
            // _config.customLaunchers = {
            //     // chrome setup for travis CI using chromium
            //     Chrome_travis_ci: {
            //         base: 'Chrome',
            //         flags: [' — no-sandbox']
            //     }
            // }
        }
    }

    if(coverage){
        _config.reporters.push('coverage');
        _config.coverageReporter = {
            check: {
                global: {
                    statements: 90,
                        lines: 90,
                        functions: 90,
                        branches: 90
                }
            },
            dir: 'coverage/',
                reporters: [{
                type: 'json',
                dir: 'coverage',
                subdir: 'json',
                file: 'coverage-final.json'
            },{
                type: 'text-summary'
            }]
        }
    }

    config.set(_config);
};