const config = require('./config')
const constants = require('./constants')
const plugins = require('./plugins')
const { assetsPath } = require('./utils')
const optimization = require('./optimization')
require('./cleanup-folder')
const rules = require("./rules")
const resolveConfig = require('./resolve.config')

const webpackConf = {
  mode: process.env.NODE_ENV,
  entry: ['./src/index.tsx'],
  output: {
    path: config.assetsRoot,
    filename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: constants.APP_ENV === 'dev' ? '[name].js' : assetsPath('js/[name].[id].[chunkhash].js'),
    publicPath: config.assetsPublicPath,
    pathinfo: false
  },
  target: "web",
  resolve: resolveConfig.resolve,
  module: {
    rules
  },
  plugins,
  optimization,
  stats: 'minimal',
  devtool: config.sourceMap
}

if (process.env.NODE_ENV === 'development') {
  webpackConf.devServer = {
    clientLogLevel: 'warning',
    publicPath: '/',
    contentBase: 'public',
    open: true,
    compress: true,
    historyApiFallback: true,
    port: config.devPort,
    hot: true,
    disableHostCheck: true
  }
}

module.exports = webpackConf
