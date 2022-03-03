// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: privateNameImplicitDeclaration.js

class C {
    constructor() {
        /** @type {string} */
        this.#x;
    }
}

