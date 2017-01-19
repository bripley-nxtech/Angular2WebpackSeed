const webpack = require('webpack');
const path = require('path');
const autoPrefixer = require('autoprefixer');

var ENV = process.env.coverage;
const coverage = ENV === 'true';

module.exports = function makeWebpackConfig(){
    var config = {};

    config.devtool = 'inline-source-map';
    config.entry = function(){return {}};
    config.resolve = {
        extensions: ['.js','.ts','.json','.scss','.css','.html']
    };
    config.module = {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader?inlineSourceMap=true&sourceMap=false', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                include: root('/src/app'),
                loader: 'raw-loader!postcss-loader'
            },
            {
                test: /\.scss$/,
                loader: 'raw-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    };

    if(coverage)
    {
        console.log('Adding Coverage Modules');
        config.module.rules.push({
            test: /\.ts$/,
            enforce: 'post',
            include: path.resolve('src'),
            loader: 'istanbul-instrumenter-loader',
            exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/]
        });

        config.module.rules.push({
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader'
        });
    }

    config.plugins = [
        // Workaround needed for angular 2
        // https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src') // location of your src
        ),
        new webpack.LoaderOptionsPlugin({
            options:{
                /*
                 Apply the tslint loader as pre/postLoader
                 */
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
                postcss: [
                    autoPrefixer({
                        browsers: ['last 2 version']
                    })
                ]
            }
        })
    ];

    return config;
}();

function root(__path) {
    return path.join(__dirname, __path);
}