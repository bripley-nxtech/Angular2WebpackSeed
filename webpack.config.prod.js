const webpack = require('webpack');
const path = require('path');
const autoPrefixer = require('autoprefixer');
const commonChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const definePlugin = require('webpack/lib/DefinePlugin');
var chunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var webpackChunkHash = require('webpack-chunk-hash');

module.exports = {
    context: __dirname,
    devtool: 'source-map',
    entry:{
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },
    output: {
        path: root('/dist'),
        filename: '[name].bundle.[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    resolve: {
        extensions: ['.js','.ts','.json','.scss','.css','.html']
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            /*
             awesome-typescript-loader: This is what loads typescript for webpack
             angular2-template-loader: This loader allows you to decouple templates from the component file and maintain
             AoT(Ahead of Time) compilation. Enables requiring templates inline as well as styles
             @angularclass/hmr-loader: Used for hot-module-replacement with webpack and angular 2 typescript files
             */
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader','angular2-template-loader','@angularclass/hmr-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            /*
             file-loader: plain old file loader for webpack
             */
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
            },
            /*
             json-loader: Used for loading json files for webpack
             */
            {
                test: /\.json$/,
                loader:'json-loader'
            },
            /*
             style-loader: Adds CSS to the DOM by injecting a <style> tag
             css-loader: Allows for requiring of css files
             postcss-loader: postprocess of css
             */
            {
                test: /\.css$/,
                exclude: root('/src/app'),
                loader: extractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader','postcss-loader']
                })
            },
            /*
             raw-loader: Allows for you to import files as a string with webpack
             */
            {
                test: /\.css$/,
                include: root('/src/app'),
                loader: 'raw-loader!postcss-loader'
            },
            /*
             sass-loader: Loads sass files for webpack
             */
            {
                test: /\.(scss|sass)$/,
                exclude: root('/src/app'),
                loader: extractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader','postcss-loader','sass-loader']
                })
            },
            {
                test: /\.(scss|sass)$/,
                include: [__dirname+'/src/app'],
                loader: 'raw-loader!postcss-loader!sass-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            /*
             tslint-loader: Loads tslint and apply it to files in webpack
             */
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            }
        ]
    },
    plugins: [
        // Workaround needed for angular 2
        // https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            root('./src') // location of your src
        ),
        new definePlugin({
            'process.env':{
                ENV: JSON.stringify(process.env.ENV)
            }
        }),
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
        }),
        new commonChunkPlugin({
            name: ['vendor','polyfills','manifest'],
            minChunks: Infinity
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpackChunkHash(),
        new chunkManifestPlugin({
            filename: 'chunk-manifest.json',
            manifestVariable: 'webpackManifest'
        }),
        new htmlWebpackPlugin({
            template: './src/public/index.html',
            chunksSortMode: 'dependency'
        }),
        new extractTextPlugin({filename: 'css/[name].[hash].css'}),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),
        new copyWebpackPlugin([{from: root('/src/public')}])
    ]
};

function root(__path) {
    return path.join(__dirname, __path);
}