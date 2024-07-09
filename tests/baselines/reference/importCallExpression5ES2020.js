//// [tests/cases/conformance/dynamicImport/importCallExpression5ES2020.ts] ////

//// [0.ts]
export class B {
    print() { return "I am B"}
}

export function foo() { return "foo" }

//// [1.ts]
export function backup() { return "backup"; }

//// [2.ts]
declare function bar(): boolean;
const specify = bar() ? "./0" : undefined;
let myModule = import(specify);
let myModule1 = import(undefined);
let myModule2 = import(bar() ? "./1" : null);
let myModule3 = import(null);


//// [0.js]
export class B {
    print() { return "I am B"; }
}
export function foo() { return "foo"; }
//// [1.js]
export function backup() { return "backup"; }
//// [2.js]
const specify = bar() ? "./0" : undefined;
let myModule = import(specify);
let myModule1 = import(undefined);
let myModule2 = import(bar() ? "./1" : null);
let myModule3 = import(null);
