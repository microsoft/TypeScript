// @checkJs: true
// @noEmit: true
// @module: commonjs

// @filename: t.ts
type Strings = string[]
export = Strings

// @filename: main.js
const t = require("./t")
