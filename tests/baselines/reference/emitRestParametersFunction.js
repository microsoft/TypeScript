//// [emitRestParametersFunction.ts]
function bar(...rest) { rest; }
function foo(x: number, y: string, ...rest) { rest; }

//// [emitRestParametersFunction.js]
function bar() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
    rest;
}
function foo(x, y) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    rest;
}
