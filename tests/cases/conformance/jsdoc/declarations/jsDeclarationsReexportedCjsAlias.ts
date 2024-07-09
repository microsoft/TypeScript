// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: lib.js
/**
 * @param {string} a
 */
function bar(a) {
    return a + a;
}

class SomeClass {
    a() {
        return 1;
    }
}

module.exports = {
    bar,
    SomeClass
}
// @filename: main.js
const { SomeClass, SomeClass: Another } = require('./lib');

module.exports = {
    SomeClass,
    Another
}