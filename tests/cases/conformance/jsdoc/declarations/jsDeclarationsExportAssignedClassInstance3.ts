// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js
class Foo {
    static stat = 10;
    member = 10;
}

module.exports = new Foo();

module.exports.additional = 20;