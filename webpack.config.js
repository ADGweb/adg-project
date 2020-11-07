const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpuckPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpuckPlugin = require('terser-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const contextPath = path.resolve(__dirname, 'src')
const emptyArray = 0

let bundlePaths = []
let templatePaths = []
let htmlPlugins = [
    new HTMLWebpackPlugin({
        minify: {
            collapseWhitespace: isProd,
            removeComments: isProd,
        },
        template: './templates/index.html',
        filename: 'index.html',
        chunks: ['main']
    })
]

const wolker = (dir) => {
    let level = fs.readdirSync(path.resolve(__dirname, `${contextPath}/${dir}`)).filter(el => !/\./.test(el))
    let filePaths = /bundle/.test(dir) ? bundlePaths : templatePaths

    if(level.length !== emptyArray) {
        level.forEach(page => {
            filePaths.push({
                nameDir: page,
                path: dir
            })
            wolker(`${dir}/${page}`)
        })
    }
}

const entryFiller = () => {
    let entry = {}

    bundlePaths.forEach(el => {
        entry[el.nameDir] = ['@babel/polyfill', `./${el.path}/${el.nameDir}/index.js`]
    })

    return entry
}

const outputFiller = (chunkName, extension) => {
    if(chunkName === 'main') {
        return `bundle.[name].[hash].${extension}`
    } else {
        for(let index = 0; index < templatePaths.length; index++){
            let templatePath = templatePaths[index]

            if(chunkName === templatePath.nameDir) {
                return `${templatePath.path}/${chunkName}/bundle.[name].[hash].${extension}`
                    .replace(/templates\/?/, '')
            }
        }
    }
}

const htmlFiller = () => {
    templatePaths.forEach(htmlPath => {
        htmlPlugins.push( new HTMLWebpackPlugin({
            minify: {
                collapseWhitespace: isProd,
                removeComments: isProd,
            },
            template: `./${htmlPath.path}/${htmlPath.nameDir}/index.html`,
            filename: `./${htmlPath.path}/${htmlPath.nameDir}/index.html`.replace(/templates\/?/, ''),
            chunks: [`${htmlPath.nameDir}`]
        })
        )
    })
}

const optimization = () => {
    const config = {
        // splitChunks: {
        //     chunks: 'all' если разные чанки используют одну библиотеку,
        //                   чтобы ее не тащить несколько раз, выносит библиотеку в отдельный файл
        // }
    }

    if( isProd ) {
        config.minimizer = [
            new OptimizeCssAssetsWebpuckPlugin(),
            new TerserWebpuckPlugin()
        ]
    }

    return config
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }]

    if ( isDev ) {
        loaders.push('eslint-loader')
    }

    return loaders
}

wolker('bundle')
wolker('templates')
htmlFiller()

module.exports = {
    context: contextPath,
    entry: entryFiller(),
    output: {
        filename: (pathData) => {
            const chunkName = pathData.chunk.name

            return outputFiller(chunkName, 'js')
        },
        path: path.resolve(__dirname, 'dist')
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        ...htmlPlugins,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: (pathData) => {
                const chunkName = pathData.chunk.name

                return outputFiller(chunkName, 'css')
            },
        }),
        new StyleLintPlugin({
            files: '**/*.(vue|html|css|scss)',
            configFile: '.stylelintrc.json',
        }),
    ],
    module: {
        rules: [
            /*{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },*/
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    publicPath: '/assets'
                }
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    publicPath: '/assets'
                }

            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}