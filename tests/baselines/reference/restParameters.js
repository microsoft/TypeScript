//// [restParameters.ts]
function f18(a?:string, ...b:number[]){ b; }
 
function f19(a?:string, b?:number, ...c:number[]){ c; }
 
function f20(a:string, b?:string, ...c:number[]){ c; }
 
function f21(a:string, b?:string, c?:number, ...d:number[]){ d; }

//// [restParameters.js]
function f18(a) {
    var b = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        b[_i - 1] = arguments[_i];
    }
    b;
}
function f19(a, b) {
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    c;
}
function f20(a, b) {
    var c = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        c[_i - 2] = arguments[_i];
    }
    c;
}
function f21(a, b, c) {
    var d = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        d[_i - 3] = arguments[_i];
    }
    d;
}
