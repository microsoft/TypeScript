// @allowJs: true
// @checkJs: true
// @strict: true
// @outDir: out
// @declaration: true

// @filename: main.js
const x = require('./ch').x
x
x.grey
x.x.grey
// @filename: ch.js
const x = {
  grey: {}
}
export { x }
