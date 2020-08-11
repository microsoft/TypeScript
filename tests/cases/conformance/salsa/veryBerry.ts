// @noEmit: true
// @allowJs: true
// @checkJs: true
// @filename: mod1.js
// @esModuleInterop: true

const x = function() { }
module.exports.x = x
// @filename: use1.js
const { x } = require('./mod1')
x

// @filename: mod2.js
const x = function() { }
module.exports = x
// @filename: use2.js
const x = require('./mod2')
x

// @filename: mod3.js
const x = function() { }
export { x }
// @filename: use3.js
import { x } from './mod3'
x

// @filename: mod4.js
const x = function() { }
export default x
// @filename: use4.js
import x from './mod4'
x

