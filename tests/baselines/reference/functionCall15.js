//// [functionCall15.ts]
function foo(a?:string, b?:number, ...b:number[]){}

//// [functionCall15.js]
function foo(a, b) {
    var b = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        b[_i - 2] = arguments[_i];
    }
}
