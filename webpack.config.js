/**
 * Created by HuaHua on 18/5/28.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');


var ie8 = process.argv.indexOf('--ie8') > -1;
console.log(process.argv);

var screw_ie8 =ie8 ?  false : true; // Same name as uglify's IE8 option. Turn this on to enable HMR.

var plugins = [
    new HtmlWebpackPlugin({
    template: './index.html'
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //     mangle: {
    //         // mangle options, if any
    //     },
    //     mangleProperties: {
    //         screw_ie8: false,
    //         //ignore_quoted: true,      // do not mangle quoted properties and object keys
    //     },
    //     compress: {
    //         screw_ie8: false,
    //         //properties: false // optional: don't convert foo["bar"] to foo.bar
    //     },
    //     output: {
    //         screw_ie8: false
    //     }
    // })
];

// HMR doesn't work with IE8
if(screw_ie8) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
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
        port: 9000,
        inline: screw_ie8,//实时刷新
        hot: screw_ie8
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