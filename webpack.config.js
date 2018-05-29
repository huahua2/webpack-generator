/**
 * Created by HuaHua on 18/5/28.
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


let screw_ie8 = process.env.WEBPACK_ENV.indexOf('ie8')==-1 ;//ie8环境要关掉模块热更新，不然会报错
let js_css_compress=process.env.WEBPACK_ENV.indexOf('pro')>-1;//生成环境js和css压缩
console.log("环境"+screw_ie8);
let plugins = [
    new HtmlWebpackPlugin({
    template: './index.html'
    }),
    new ExtractTextPlugin("css/[name]-[hash].css")
];

// HMR doesn't work with IE8
if(screw_ie8) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

//开启js压缩
if(js_css_compress){
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
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
}


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]-[hash].js'
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
            },
            // {
            //     test: /\.css$/,
            //     loaders: ['style-loader', 'css-loader'],
            // }
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options:{
                                minimize: js_css_compress //css压缩
                            }
                        }
                    ]
                })
            }
        ]
    },
    plugins: plugins
};