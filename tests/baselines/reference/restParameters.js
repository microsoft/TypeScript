//// [restParameters.ts]
function f18(a?:string, ...b:number[]){}
 
function f19(a?:string, b?:number, ...c:number[]){}
 
function f20(a:string, b?:string, ...c:number[]){}
 
function f21(a:string, b?:string, c?:number, ...d:number[]){}

//// [restParameters.js]
function f18(a) {
    var b = [];
    for (var _i = 0; _i < (arguments.length - 1); _i++) {
        b[_i] = arguments[_i + 1];
    }
}

function f19(a, b) {
    var c = [];
    for (var _i = 0; _i < (arguments.length - 2); _i++) {
        c[_i] = arguments[_i + 2];
    }
}

function f20(a, b) {
    var c = [];
    for (var _i = 0; _i < (arguments.length - 2); _i++) {
        c[_i] = arguments[_i + 2];
    }
}

function f21(a, b, c) {
    var d = [];
    for (var _i = 0; _i < (arguments.length - 3); _i++) {
        d[_i] = arguments[_i + 3];
    }
}
