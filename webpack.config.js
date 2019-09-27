const path = require("path");
const rootPath = path.join(__dirname,'./');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//抽出css檔案
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//自動產生html 靜態檔案對應
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].[chunkhash].js',          //filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/, // /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },
            //image files
            {
            test:/\.(png|jpg|jpe?g|gif)$/,
            use: [
                {
                    loader:"url-loader",
                    options:{
                        name:"[name]-[hash:5].min.[ext]",
                        limit: 2000,//size <=20KB
                        publicPath:"static/",
                        outputPath:"static/",
                    }
                }
            ]
        },
            //Font files
            {
                test:/\.(woff|woff2|ttf|otf|eot|svg)$/,
                loader:'file-loader',
                include:[/fonts/],

                options:{
                    name: '[hash].[ext]',
                    outputPath:'css/',
                    publicPath: url => '../css/' + url
                }
            }
        ]   //rules end
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    devServer: {
        open: true,
        contentBase: path.join(__dirname, '.'),
        compress: true,
        port: 9000
    }
};
