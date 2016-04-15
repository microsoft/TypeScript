//// [tests/cases/compiler/newNamesInGlobalAugmentations1.ts] ////

//// [f1.d.ts]

export {};

declare global {
    interface SymbolConstructor {
        observable: symbol;
    }
    class Cls {x}
    let [a, b]: number[];
}

//// [main.ts]

Symbol.observable;
new Cls().x

//// [main.js]
Symbol.observable;
new Cls().x;
