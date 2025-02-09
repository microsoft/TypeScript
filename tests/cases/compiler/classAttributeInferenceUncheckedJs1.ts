// @allowJs: true
// @checkJs: false
// @noEmit: true
// @Filename: classAttributeInferenceUncheckedJs1.js
// @target: es2015

class C1 {
    bar;
    constructor () {
        this.foo;
        this.bar;
    }
}

class C2 {
    #bar;
    constructor () {
        this.#foo;
        this.#bar;
    }
}
