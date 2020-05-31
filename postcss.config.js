const autoprefixer = require('autoprefixer')

//css编译完成之后再通过postcss来编译优化代码，使其浏览器兼容性更好
module.exports ={
    plugins : [
        autoprefixer()
    ]
}