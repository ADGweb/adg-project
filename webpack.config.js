const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpuckPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpuckPlugin = require('terser-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackInjector = require('html-webpack-injector')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const contextPath = path.resolve(__dirname, 'src')

let bundlePaths = []
let templatePaths = []
let staticPaths = []
let htmlPlugins = [
    new HTMLWebpackPlugin({
        minify: {
            collapseWhitespace: isProd,
            removeComments: isProd,
        },
        template: './templates/index.html',
        filename: 'index.html',
        chunks: ['main', 'global_head']
    })
]

const wolker = (dir) => {
    const level = fs.readdirSync(path.resolve(__dirname, `${contextPath}/${dir}`)).filter(el => {
        return fs.statSync(path.resolve(__dirname, `${contextPath}/${dir}/${el}`)).isDirectory()
    })
    const filePaths = /bundle/.test(dir) ? bundlePaths : templatePaths

    if(level.length) {
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
    }
    else {
        for(let index = 0; index < templatePaths.length; index++){
            let templatePath = templatePaths[index]

            if(chunkName === templatePath.nameDir) {
                return `${templatePath.path}/${chunkName}/bundle.[name].[hash].${extension}`
                    .replace(/templates\/?/, '')
            }
        }
    }

    return `assets/bundle.[name].[hash].${extension}`
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
            chunks: [`${htmlPath.nameDir}`, 'global_head']
        })
        )
    })
}

const staticСollector = (dir) => {
    const levels = fs.readdirSync(path.resolve(__dirname, `${contextPath}/${dir}`)).filter(el => {
        return fs.statSync(path.resolve(__dirname, `${contextPath}/${dir}/${el}`)).isDirectory()
    })

    if(levels.length) {
        levels.forEach(level => {
            const statics = fs.readdirSync(path.resolve(__dirname, `${contextPath}/${dir}/${level}`))
                .filter(el => fs.statSync(path.resolve(__dirname, `${contextPath}/${dir}/${level}/${el}`)).isFile())

            statics.forEach(el => {
                staticPaths.push({
                    from: path.resolve(__dirname, `${contextPath}/${dir}/${level}/${el}`),
                    to: path.resolve(__dirname, 'dist/assets')
                })
            })

            staticСollector(`${dir}/${level}`)
        })
    }
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
staticСollector('assets/static')

module.exports = {
    resolve : {
        extensions : ['.js', '.vue'], // что бы в импортах не писать разрешение файла
        alias      : {
            '@' : path.resolve( __dirname, 'src' ),
        },
    },
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
        new HtmlWebpackInjector(),
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
        new CopyWebpackPlugin(staticPaths),
        new VueLoaderPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader']
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 hmr: isDev,
            //                 reloadAll: true
            //             },
            //         },
            //         'css-loader'
            //     ]
            // },
            {
                test: /\.s[ac]ss$/,
                use: [
                    'vue-style-loader',
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
                loader: 'file-loader', // этот лоудер для использования картинок в css, scss и js
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
            },
            {
                test: /\.vue$/,
                use: isDev
                    ? [ 'vue-loader', 'eslint-loader' ]
                    : [ 'vue-loader' ]
            },
        ]
    }
}