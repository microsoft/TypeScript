//// [restParameters.ts]
function f18(a?:string, ...b:number[]){}
 
function f19(a?:string, b?:number, ...c:number[]){}
 
function f20(a:string, b?:string, ...c:number[]){}
 
function f21(a:string, b?:string, c?:number, ...d:number[]){}

//// [restParameters.js]
function f18(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
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
    for (var _b = 2; _b < arguments.length; _b++) {
        c[_b - 2] = arguments[_b];
    }
}
function f21(a, b, c) {
    var d = [];
    for (var _c = 3; _c < arguments.length; _c++) {
        d[_c - 3] = arguments[_c];
    }
}
