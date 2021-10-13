const constants = require('./constants')
const config = require('./config')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = constants.APP_ENV === 'dev' ? {} : {
  runtimeChunk: {
    name: 'manifest'
  },
  splitChunks: {
    cacheGroups: {
      default: false,
      buildup: {
        chunks: 'all',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
      vendor: {
        name: 'vendor',
        test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|axios)[\\/]/,
        chunks: "all",
        priority: -20
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: Boolean(config.sourceMap)
    }),
    new CssMinimizerPlugin(), '...',
  ],
  moduleIds: false,
  removeAvailableModules: true,
  removeEmptyChunks: true,
  mergeDuplicateChunks: true,
  flagIncludedChunks: true,
  innerGraph: true,
  realContentHash: true
}
