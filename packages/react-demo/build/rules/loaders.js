const constants = require('./../constants')
const { resolve } = require('./../utils')

const cacheLoader = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: resolve('.cache-loader')
  }
}

const threadLoader = workerParallelJobs => {
  const options = { workerParallelJobs }
  if (constants.APP_ENV === 'dev') {
    Object.assign(options, { poolTimeout: Infinity })
  }
  return { loader: 'thread-loader', options }
}

module.exports = {
  cacheLoader,
  threadLoader
}
