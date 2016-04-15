// @target: es6

// @filename: f1.d.ts
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

// @filename: main.ts

Symbol.observable;
new Cls().x
let c = a + b + X;