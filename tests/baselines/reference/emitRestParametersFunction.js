//// [emitRestParametersFunction.ts]
function bar(...rest) { }
function foo(x: number, y: string, ...rest) { }

//// [emitRestParametersFunction.js]
function bar() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
function foo(x, y) {
    var rest = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        rest[_a - 2] = arguments[_a];
    }
}
