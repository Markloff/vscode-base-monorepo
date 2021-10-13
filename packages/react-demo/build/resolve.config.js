const constants = require('./constants')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')
const { resolve } = require('./utils')
module.exports = {
    resolve: {
        extensions: constants.FILE_EXTENSIONS,
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('tsconfig.webpack.json'),
                extensions: constants.FILE_EXTENSIONS
            })
        ],
        alias: {
            '@': resolve('src/'),
            'lib': resolve('srcb')
        }
    },
}