// @allowJs: true
// @checkJs: true
// @strict: true
// @declaration: true
// @outDir: ./out
// @filename: /a.js

/**
 * @param {number | undefined} x
 * @param {number | undefined} y
 */
export function Foo(x, y) {
    if (!(this instanceof Foo)) {
        return new Foo(x, y);
    }
    this.x = x;
    this.y = y;
}
