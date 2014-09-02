//// [restParameterEmit.ts]
function shouldEmit(x, y, z, ...rest) {
    return rest;
}

function shouldEmit2(x, y, z, ...rest) {
    var a = rest.concat([x, y, z]);
}

function shouldEmit3(a: string, b: number, ...rest: any[]) {
    g();
    return;

    function g(): any {
        return rest[0];
    }
}

function shouldEmit4(a: number, ...rest: number[]) {
    function g(x: number = rest[0]): number {
        return a || x;
    }

    return g();
}

function shouldNotEmit(x, y, z, ...rest) {
    return;
}

var shouldNotEmit2 = (a, b, ...c) => a.concat([1,2,3]);

function shouldNotEmit3(a: string, b: number, ...rest: any[]) {
    g();
    return;

    function g(): any {
        return a;
    }
}

function shouldNotEmit4(a: number, b: number[], ...rest: number[]) {
    function g(x: number = b[0]): number {
        return a || x;
    }

    return g();
}


//// [restParameterEmit.js]
function shouldEmit(x, y, z) {
    var rest = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        rest[_i - 3] = arguments[_i];
    }
    return rest;
}
function shouldEmit2(x, y, z) {
    var rest = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        rest[_i - 3] = arguments[_i];
    }
    var a = rest.concat([x, y, z]);
}
function shouldEmit3(a, b) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    g();
    return;
    function g() {
        return rest[0];
    }
}
function shouldEmit4(a) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    function g(x) {
        if (x === void 0) { x = rest[0]; }
        return a || x;
    }
    return g();
}
function shouldNotEmit(x, y, z) {
    return;
}
var shouldNotEmit2 = function (a, b) { return a.concat([1, 2, 3]); };
function shouldNotEmit3(a, b) {
    g();
    return;
    function g() {
        return a;
    }
}
function shouldNotEmit4(a, b) {
    function g(x) {
        if (x === void 0) { x = b[0]; }
        return a || x;
    }
    return g();
}
