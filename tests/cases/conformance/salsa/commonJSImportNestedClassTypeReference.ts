// @allowJs: true
// @checkJs: true
// @strict: true
// @outDir: out
// @declaration: true

// @filename: main.js
const { K } = require("./mod1");
/** @param {K} k */
function f(k) {
    k.values()
}

// @filename: mod1.js
var NS = {}
NS.K =class {
    values() {
        return new NS.K()
    }
}
exports.K = NS.K;
