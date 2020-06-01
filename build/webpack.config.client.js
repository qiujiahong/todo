const path = require("path")
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         NODE_ENV: isDev ? '"development"' : '"production"'
    //     }
    // }),
    // new HTMLPlugin({
    //     template: path.join(__dirname, 'template.html')
    // }),
    // new VueClientPlugin(),
    // new VueLoaderPlugin()
]

let config

if (isDev) {
    config = merge( baseConfig, {
        devtool: '#cheap-module-eval-source-map',
        module:{
            rules: [
                {
                    // test: /\.styl$/,
                    test: /\.styl(us)?$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        {
                            loader: "postcss-loader",
                            //使用前面生成的sourceMap
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer:{
            port: 8000,
            host: '0.0.0.0',
            //有错误显示到网页上
            overlay: {
                errors: true
            },
            //没有的路由默认跳转到一个页面去
            // historyFallback:{
            //
            // },
            //启动webpack-dev-server的时候自动帮助打开浏览器
            open: true,
            //更改内容之后热加载,HotModuleReplacementPlugin, NoEmitOnErrorsPlugin
            hot: true,
        },
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })

} else {
    //生产模式的时候修改配置
    // config.entry = {
    //     app: path.join(__dirname, 'src/index.js'),
    //     vendor: ['vue']
    // }
    // //配置css编译优化vendor 相关的独立出来
    // config.optimization = {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2, maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     },
    //     runtimeChunk: true
    // }
    //
    // config.output.filename = '[name].[chunkhash:8].js'
    // config.module.rules.push(
    //     {
    //         test: /\.styl/,
    //         use: [
    //             {
    //                 loader: MiniCssExtractPlugin.loader,
    //                 options: {
    //                     // publicPath:  path.join(__dirname,'dist'),
    //                     publicPath: (resourcePath, context) => {
    //                         return path.relative(path.dirname(resourcePath), context) + '/dist';
    //                     },
    //                 },
    //             },
    //             'css-loader',
    //             {
    //                 loader: "postcss-loader",
    //                 //使用前面生成的sourceMap
    //                 options: {
    //                     sourceMap: true
    //                 }
    //             },
    //             'stylus-loader',
    //         ],
    //     },
    // )
    //
    // config.plugins.push(
    //     new MiniCssExtractPlugin({
    //         // Options similar to the same options in webpackOptions.output
    //         // all options are optional
    //         filename: '[name].[contentHash:8].css',
    //         // chunkFilename: '[id].[contentHash:8].css',
    //         chunkFilename: '[name].[contentHash:8].css',
    //         ignoreOrder: false, // Enable to remove warnings about conflicting order
    //     }),
    // )
}


module.exports = config

