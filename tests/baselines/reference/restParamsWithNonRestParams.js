//// [tests/cases/compiler/restParamsWithNonRestParams.ts] ////

//// [restParamsWithNonRestParams.ts]
function foo(...b:number[]){}
foo(); // ok
function foo2(a:string, ...b:number[]){}
foo2(); // should be an error
function foo3(a?:string, ...b:number[]){}
foo3(); // error but shouldn't be

//// [restParamsWithNonRestParams.js]
function foo() {
    var b = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        b[_i] = arguments[_i];
    }
}
foo(); // ok
function foo2(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
}
foo2(); // should be an error
function foo3(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
}
foo3(); // error but shouldn't be
