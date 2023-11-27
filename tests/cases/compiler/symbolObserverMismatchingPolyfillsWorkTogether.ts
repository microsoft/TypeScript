// @declaration: true
// @target: es6
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed
interface SymbolConstructor {
    readonly observer: symbol;
}
interface SymbolConstructor {
    readonly observer: unique symbol;
}

const obj = {
    [Symbol.observer]: 0
};