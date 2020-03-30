// @allowJs: true
// @checkJs: true
// @outDir: /out
// @lib: es6
// @declaration: true
// @filename: /some-mod.d.ts
interface Item {
    x: string;
}
declare const items: Item[];
export = items;
// @filename: index.js

/** @type {typeof import("/some-mod")} */
const items = [];
module.exports = items;