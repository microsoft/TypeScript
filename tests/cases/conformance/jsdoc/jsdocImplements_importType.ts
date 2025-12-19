// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out

// @Filename: /a.js
/** @implements {import('./b').B} */
class A {
    /** @return {number} */
    method() { throw new Error(); }
}
// @Filename: /b.ts
export interface B  {
    method(): number
}
