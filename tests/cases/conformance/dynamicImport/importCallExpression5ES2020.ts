// @module: es2020
// @target: es2020
// @strictNullChecks: true
// @filename: 0.ts
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

// @filename: 1.ts
export function backup() { return "backup"; }

// @filename: 2.ts
declare function bar(): boolean;
const specify = bar() ? "./0" : undefined;
let myModule = import(specify);
let myModule1 = import(undefined);
let myModule2 = import(bar() ? "./1" : null);
let myModule3 = import(null);
