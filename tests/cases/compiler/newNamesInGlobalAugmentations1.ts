// @target: es6

// @filename: f1.d.ts
export {};

declare global {
    interface SymbolConstructor {
        observable: symbol;
    }
    class Cls {x}
    let [a, b]: number[];
}

// @filename: main.ts

Symbol.observable;
new Cls().x