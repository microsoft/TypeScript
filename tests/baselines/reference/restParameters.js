//// [restParameters.ts]
function f18(a?:string, ...b:number[]){}
 
function f19(a?:string, b?:number, ...c:number[]){}
 
function f20(a:string, b?:string, ...c:number[]){}
 
function f21(a:string, b?:string, c?:number, ...d:number[]){}

//// [restParameters.js]
function f18(a) {
    var b = [];
    for (var _a = 1; _a < arguments.length; _a++) {
        b[_a - 1] = arguments[_a];
    }
}
function f19(a, b) {
    var c = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        c[_a - 2] = arguments[_a];
    }
}
function f20(a, b) {
    var c = [];
    for (var _a = 2; _a < arguments.length; _a++) {
        c[_a - 2] = arguments[_a];
    }
}
function f21(a, b, c) {
    var d = [];
    for (var _a = 3; _a < arguments.length; _a++) {
        d[_a - 3] = arguments[_a];
    }
}
