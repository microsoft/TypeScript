// @allowJs: true
// @checkJs: true
// @target: esnext
// @outFile: foo.js
// @declaration: true
// @Filename: jsdocReadonlyDeclarations.js
// @useDefineForClassFields: false
class C {
    /** @readonly */
    x = 6
    /** @readonly */
    constructor(n) {
        this.x = n
        /**
         * @readonly
         * @type {number}
         */
        this.y = n
    }
}
new C().x

function F() {
    /** @readonly */
    this.z = 1
}

// https://github.com/microsoft/TypeScript/issues/38401
class D {
    constructor(/** @readonly */ x) {}
}
