const { assetsPath, resolve } = require('./../utils')
const { threadLoader, cacheLoader } = require('./loaders')

function getUrlLoader(assetsPrefix) {
  return {
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: assetsPath(`${assetsPrefix}/[name].[hash:7].[ext]`)
    }
  }
}

module.exports = [
  {
    test: /\.(png|jpe?g|gif)(\?.*)?$/,
    use: [getUrlLoader('img')]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [getUrlLoader('fonts')]
  },
  {
    test: /\.svg$/,
    use: [cacheLoader, threadLoader(), '@svgr/webpack'],
    include: [resolve('src')]
  }
]
