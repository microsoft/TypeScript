// @allowJs: true
// @checkJs: true
// @outDir: ./out
// @lib: es6
// @declaration: true
// @filename: some-mod.d.ts
interface Item {
    x: string;
}
declare function getItems(): Item[];
export = getItems;
// @filename: index.js

const items = require("./some-mod")();
module.exports = items;