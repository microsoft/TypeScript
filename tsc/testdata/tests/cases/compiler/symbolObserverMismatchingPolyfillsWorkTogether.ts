// @declaration: true
// @target: es6
interface SymbolConstructor {
    readonly observer: symbol;
}
interface SymbolConstructor {
    readonly observer: unique symbol;
}

const obj = {
    [Symbol.observer]: 0
};