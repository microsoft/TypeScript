// @allowJs: true
// @checkJs: true
// @target: es5, es2015
// @outDir: ./out
// @declaration: true
// @filename: index.js
class A {
    member = new Q();
}
class Q {
    x = 42;
}
module.exports = class Q {
    constructor() {
        this.x = new A();
    }
}
module.exports.Another = Q;
