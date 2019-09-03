// @allowJs: true
// @checkJs: true
// @noEmit: true
// @strict: true
// @target: es6
// @filename: file.js
const _sym = Symbol("_sym");
class MyClass {
    constructor() {
        this[_sym] = "ok";
    }

    method() {
        this[_sym] = "yep";
        const x = this[_sym];
    }
}