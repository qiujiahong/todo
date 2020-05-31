const   path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config ={
    target: "web",
    entry:  path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins: [
        new VueLoaderPlugin(),
        //vue webpack会根据不同的环境区分打包
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev? '"development"' :'"production"'
            }
        }),
        new HTMLPlugin()
    ],
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                //.vue结尾的使用vue-loader来处理
                test: /.vue$/,
                loader: 'vue-loader'
            },
            {// 添加这个json，解决如上的报错问题
                test: /\.scss$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {// 添加这个json，解决如上的报错问题
                //使用的use模式
                test: /\.css$/,
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.styl$/,
                use: ['style-loader','css-loader', 'stylus-loader']
            },
            {
                test:/\.(gif|jpeg|jpg|png|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            //文件小于1024转移成为base64存储
                            limit: 1024,
                            name: '[name]-bbb.[ext]'
                        }
                    }
                ]

            }
        ]
    }
}


if (isDev){
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
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
        // hot: true,
    }
    // config.plugins.push(
    //     new webpack.HotModuleReplacementPlugin()
    //     new webpack.NoEmitOnErrorsPlugin()
    // )
}


module.exports = config
