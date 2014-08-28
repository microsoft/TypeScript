//// [restParamsWithNonRestParams.ts]
function foo(...b:number[]){}
foo(); // ok
function foo2(a:string, ...b:number[]){}
foo2(); // should be an error
function foo3(a?:string, ...b:number[]){}
foo3(); // error but shouldn't be

//// [restParamsWithNonRestParams.js]
function foo() {
}
foo(); // ok
function foo2(a) {
}
foo2(); // should be an error
function foo3(a) {
}
foo3(); // error but shouldn't be
