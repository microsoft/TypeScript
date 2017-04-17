//// [tests/cases/compiler/newNamesInGlobalAugmentations1.ts] ////

//// [f1.d.ts]
export {};

declare module M.M1 {
    export let x: number;
}
declare global {
    interface SymbolConstructor {
        observable: symbol;
    }
    class Cls {x}
    let [a, b]: number[];
    export import X = M.M1.x;
}

//// [main.ts]
Symbol.observable;
new Cls().x
let c = a + b + X;

//// [main.js]
Symbol.observable;
new Cls().x;
let c = a + b + X;
