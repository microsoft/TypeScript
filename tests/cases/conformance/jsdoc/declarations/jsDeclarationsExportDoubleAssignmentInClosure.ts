// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @declaration: true
// @filename: index.js
// @ts-nocheck
function foo() {
    module.exports = exports = function (o) {
        return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
    };
    exports.methods = methods;
}