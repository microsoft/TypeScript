// @declaration
// @outdir: out
// @checkjs: true
// @allowjs: true
// @filename: mod.js
module.exports = {
    x: {
        y: "value"
    }
}
// @filename: requireTwoPropertyAccesses.js
const value = require("./mod").x.y
console.log(value)
