// @allowJs: true
// @checkJs: true
// @noEmit: true
// @lib: dom,esnext
// @Filename: jsdocPrivateName1.js
// @target: es2015

class A {
    /** @type {boolean} some number value */
    #foo = 3 // Error because not assignable to boolean
}
