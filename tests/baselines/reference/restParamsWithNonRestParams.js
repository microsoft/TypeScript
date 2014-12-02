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
    for (var _a = 0; _a < arguments.length; _a++) {
        b[_a - 0] = arguments[_a];
    }
}
foo(); // ok
function foo2(a) {
    var b = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        b[_a - 1] = arguments[_a];
    }
}
foo2(); // should be an error
function foo3(a) {
    var b = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        b[_a - 1] = arguments[_a];
    }
}
foo3(); // error but shouldn't be
