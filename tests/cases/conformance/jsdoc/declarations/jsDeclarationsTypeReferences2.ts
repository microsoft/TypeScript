// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: tests/cases/conformance/jsdoc/declarations/out
// @declaration: true
// @filename: something.ts
export const o = {
    a: 1,
    m: 1
}

// @filename: index.js

const{ a, m } = require("./something").o;

const thing = a + m

module.exports = {
    thing
};
