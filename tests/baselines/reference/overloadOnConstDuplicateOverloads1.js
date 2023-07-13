//// [tests/cases/compiler/overloadOnConstDuplicateOverloads1.ts] ////

//// [overloadOnConstDuplicateOverloads1.ts]
function foo(a: 'hi', x: string);
function foo(a: 'hi', x: string);
function foo(a: any, x: any) {
}

function foo2(a: 'hi', x: string);
function foo2(a: 'hi', x: string);
function foo2(a: string, x: string);
function foo2(a: any, x: any) {
}

//// [overloadOnConstDuplicateOverloads1.js]
function foo(a, x) {
}
function foo2(a, x) {
}
