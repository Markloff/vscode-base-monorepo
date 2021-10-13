const { resolve } = require('./../utils')
const { cacheLoader, threadLoader } = require('./loaders')

module.exports = [
  {
    test: /\.(j|t)sx?$/,
    include: [resolve('src')],
    exclude: /node_modules/,
    use: [
      cacheLoader,
      threadLoader(),
      'babel-loader'
    ],
    // loader: 'babel-loader'
  }
]
