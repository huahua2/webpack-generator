/**
 * Created by HuaHua on 18/5/28.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let screw_ie8 = process.env.WEBPACK_ENV.indexOf('ie8')==-1 ;//ie8环境要关掉模块热更新，不然会报错
const jscompress=false;

let plugins = [
    new HtmlWebpackPlugin({
    template: './index.html'
    }),
];

// HMR doesn't work with IE8
if(screw_ie8) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

//开启js压缩
if(jscompress){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                // mangle options, if any
            },
            mangleProperties: {
                screw_ie8: false,
                //ignore_quoted: true,      // do not mangle quoted properties and object keys
            },
            compress: {
                screw_ie8: false,
                //properties: false // optional: don't convert foo["bar"] to foo.bar
            },
            output: {
                screw_ie8: false
            }
         })
    )
}


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9001,
        // overlay: true,
        // stats: "errors-only",
        hot: screw_ie8,
        inline: screw_ie8//实时刷新
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.js$/,
                enforce: "post",
                loader: "es3ify-loader"
            }
        ]
    },
    plugins: plugins
};