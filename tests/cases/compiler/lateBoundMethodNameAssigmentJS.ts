// @allowJs: true
// @checkJs: true
// @emitDeclarationOnly: true
// @strict: true
// @target: es6
// @declaration: true
// @filename: lateBoundMethodNameAssigmentJS.js
const _symbol = Symbol("_sym");
export class MyClass {
    constructor() {
        this[_symbol] = this[_symbol].bind(this);
    }

    async [_symbol]() { }
}