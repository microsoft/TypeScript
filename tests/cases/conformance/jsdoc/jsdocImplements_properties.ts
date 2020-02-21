// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out

// @Filename: /a.js
class A { constructor() { this.x = 0; } }
/** @implements A*/
class B {}

/** @implements A*/
class B2 {
    x = 10
}

/** @implements {A}*/
class B3 {
    constructor() { this.x = 10 }
}
