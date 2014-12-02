//// [functionCall15.ts]
function foo(a?:string, b?:number, ...b:number[]){}

//// [functionCall15.js]
function foo(a, b) {
    var b = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        b[_a - 2] = arguments[_a];
    }
}
