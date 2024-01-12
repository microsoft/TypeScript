// @outdir: out/
// @target: esnext
// @module: esnext
// @allowJs: true
// @filename: plainJSGrammarErrors4.js
class A {
    #a;
    m() {
        this.#a; // ok
        this.#b; // error
    }
}
