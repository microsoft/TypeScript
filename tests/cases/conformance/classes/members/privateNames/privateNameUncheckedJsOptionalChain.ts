// @allowJs: true
// @checkJs: false
// @noEmit: true
// @Filename: privateNameUncheckedJsOptionalChain.js
// @target: es2015

class C {
    #bar;
    constructor () {
        this?.#foo;
        this?.#bar;
    }
}
