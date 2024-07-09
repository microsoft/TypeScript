//// [tests/cases/compiler/overloadingOnConstantsInImplementation.ts] ////

//// [overloadingOnConstantsInImplementation.ts]
function foo(a: 'hi', x: string);
function foo(a: 'hi', x: string);
function foo(a: 'hi', x: any) {
}

//// [overloadingOnConstantsInImplementation.js]
function foo(a, x) {
}
