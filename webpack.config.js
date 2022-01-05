const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode : 'development',
    entry : {
        app : './src/index.js',
        profile : './src/profile.js'
    },
    devtool : 'inline-source-map',
    devServer : {
        static: './'
    },
    plugins : [
        new HtmlWebpackPlugin({}),
        new CleanWebpackPlugin()
    ],
    output : {
        filename : '[name].bundle.js',
        path : path.resolve(__dirname, 'dist')
    },
    module : {
        rules : [
            {
                test : /\.css$/,
                use : [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};