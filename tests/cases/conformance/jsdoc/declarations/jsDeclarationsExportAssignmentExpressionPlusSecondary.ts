// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: index.js
const Strings = {
    a: "A",
    b: "B"
};
module.exports = {
    thing: "ok",
    also: "ok",
    desc: {
        item: "ok"
    }
};
module.exports.Strings = Strings;
