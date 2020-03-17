// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out

// @Filename: /defs.d.ts
interface Sig {
    [index: string]: string
}
// @Filename: /a.js
/** @implements {Sig} */
class B  {
}
