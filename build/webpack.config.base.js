const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    target: "web",
    entry: path.join(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    plugins: [
        new VueLoaderPlugin(),
        //vue webpack会根据不同的环境区分打包
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
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
            {
                test: /.jsx$/,
                loader: 'babel-loader'
            },
            // {// 添加这个json，解决如上的报错问题
            //     test: /\.scss$/,
            //     use: ['style-loader','css-loader', 'sass-loader']
            // },
            // {// 添加这个json，解决如上的报错问题
            //     //使用的use模式
            //     test: /\.css$/,
            //     use: ['style-loader','css-loader', 'sass-loader']
            // },
            {
                test: /\.(gif|jpeg|jpg|png|svg)$/,
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



module.exports = config

