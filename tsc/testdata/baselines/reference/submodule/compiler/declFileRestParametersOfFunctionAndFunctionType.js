//// [tests/cases/compiler/declFileRestParametersOfFunctionAndFunctionType.ts] ////

//// [declFileRestParametersOfFunctionAndFunctionType.ts]
function f1(...args) { }
function f2(x: (...args) => void) { }
function f3(x: { (...args): void }) { }
function f4<T extends (...args) => void>() { }
function f5<T extends { (...args): void }>() { }
var f6 = () => { return [<any>10]; }




//// [declFileRestParametersOfFunctionAndFunctionType.js]
function f1(...args) { }
function f2(x) { }
function f3(x) { }
function f4() { }
function f5() { }
var f6 = () => { return [10]; };
