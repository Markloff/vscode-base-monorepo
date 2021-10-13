const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { compilerHooks } = require('./custom-plugins')
const constants = require('./constants')
const config = require('./config')
const { assetsPath, resolve } = require('./utils')
const env = require('./env.json')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const path = require('path')
const oriEnv = {...env[constants.APP_ENV], APP_ENV: constants.APP_ENV}
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const defineEnv = {}
for (const key in oriEnv) {
  defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}
const basePlugins = [
  new MomentLocalesPlugin({
    localesToKeep: ['es-us', 'zh-cn']
  }),
  new webpack.DefinePlugin(defineEnv),
  new TypedCssModulesPlugin({
    globPattern: 'src/!(styles)/**/*.scss'
  }),
  new webpack.ids.DeterministicModuleIdsPlugin({
    maxLength: 5
  })
]

const devPlugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'build/tpl/index.html'
  }),
  // new CaseSensitivePathsPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // ...compilerHooks
]

const prodPlugins = [
  new HtmlWebpackPlugin({
    filename: config.index,
    template: 'build/tpl/index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new MiniCssExtractPlugin({
    filename: assetsPath('css/[name].[contenthash].css'),
    chunkFilename: assetsPath('css/[name].[id].[contenthash].css'),
    ignoreOrder: true
  }),
  new WorkboxPlugin.GenerateSW({
    cacheId: 'ts-react-webpack',
    clientsClaim: true,
    skipWaiting: true,
    offlineGoogleAnalytics: false,
    inlineWorkboxRuntime: true,
    exclude: [/index\.html$/, /\.map$/]
  }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
    canPrint: true
  }),
  new CompressionWebpackPlugin(),
  new CopyPlugin({
    patterns: [
      {
        from: resolve('public'),
        to: path.resolve(config.assetsRoot, './public')
      }
    ]
  })
]

if (config.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  prodPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = basePlugins.concat(constants.APP_ENV === 'dev' ? devPlugins : prodPlugins)
