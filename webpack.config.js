const   path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports ={
    entry:  path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    mode: "development",
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