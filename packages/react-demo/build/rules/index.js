const styleRules = require('./styleRules')
const jsRules = require('./jsRules')
const fileRules = require('./fileRules')

module.exports = [...styleRules,...jsRules, ...fileRules]