// @isolatedDeclarations: true
// @declaration: true
// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @filename: a.js
function foo() { return 1; }
export class C {
    constructor() {
        this.x = foo();
    }
}
