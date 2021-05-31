// @allowJs: true
// @checkJs: true
// @target: es5
// @outDir: ./out
// @declaration: true
// @filename: bar.js
export class Z {
    f(x = 1, y) {
        return [x, y];
    }
}