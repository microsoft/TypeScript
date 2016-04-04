//// [newWithSpread.ts]

function f(x: number, y: number, ...z: string[]) {
}

function f2(...x: string[]) {
}

interface A {
    f: {
        new (x: number, y: number, ...z: string[]);
    }
}

class B {
    constructor(x: number, y: number, ...z: string[]) {}
}

interface C {
    "a-b": typeof B;
}

interface D {
    1: typeof B;
}

var a: string[];
var b: A;
var c: C;
var d: A[];
var e: { [key: string]: A };
var g: C[];
var h: { [key: string]: C };
var i: C[][];

// Basic expression
new f(1, 2, "string");
new f(1, 2, ...a);
new f(1, 2, ...a, "string");

// Multiple spreads arguments
new f2(...a, ...a);
new f(1 ,2, ...a, ...a);

// Call expression
new f(1, 2, "string")();
new f(1, 2, ...a)();
new f(1, 2, ...a, "string")();

// Property access expression
new b.f(1, 2, "string");
new b.f(1, 2, ...a);
new b.f(1, 2, ...a, "string"); 

// Parenthesised expression
new (b.f)(1, 2, "string");
new (b.f)(1, 2, ...a);
new (b.f)(1, 2, ...a, "string"); 

// Element access expression
new d[1].f(1, 2, "string");
new d[1].f(1, 2, ...a);
new d[1].f(1, 2, ...a, "string");

// Element access expression with a punctuated key
new e["a-b"].f(1, 2, "string");
new e["a-b"].f(1, 2, ...a);
new e["a-b"].f(1, 2, ...a, "string");

// Basic expression
new B(1, 2, "string");
new B(1, 2, ...a);
new B(1, 2, ...a, "string");

// Property access expression
new c["a-b"](1, 2, "string");
new c["a-b"](1, 2, ...a);
new c["a-b"](1, 2, ...a, "string");

// Parenthesised expression
new (c["a-b"])(1, 2, "string");
new (c["a-b"])(1, 2, ...a);
new (c["a-b"])(1, 2, ...a, "string");

// Element access expression
new g[1]["a-b"](1, 2, "string");
new g[1]["a-b"](1, 2, ...a);
new g[1]["a-b"](1, 2, ...a, "string");

// Element access expression with a punctuated key
new h["a-b"]["a-b"](1, 2, "string");
new h["a-b"]["a-b"](1, 2, ...a);
new h["a-b"]["a-b"](1, 2, ...a, "string");

// Element access expression with a number
new i["a-b"][1](1, 2, "string");
new i["a-b"][1](1, 2, ...a);
new i["a-b"][1](1, 2, ...a, "string");

//// [newWithSpread.js]
function f(x, y) {
    var z = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        z[_i - 2] = arguments[_i];
    }
}
function f2() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i - 0] = arguments[_i];
    }
}
var B = (function () {
    function B(x, y) {
        var z = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            z[_i - 2] = arguments[_i];
        }
    }
    return B;
}());
var a;
var b;
var c;
var d;
var e;
var g;
var h;
var i;
// Basic expression
new f(1, 2, "string");
new ((_a = f).bind.apply(_a, [void 0, 1, 2].concat(a)))();
new ((_b = f).bind.apply(_b, [void 0, 1, 2].concat(a, ["string"])))();
// Multiple spreads arguments
new ((_c = f2).bind.apply(_c, [void 0].concat(a, a)))();
new ((_d = f).bind.apply(_d, [void 0, 1, 2].concat(a, a)))();
// Call expression
new f(1, 2, "string")();
new ((_e = f).bind.apply(_e, [void 0, 1, 2].concat(a)))()();
new ((_f = f).bind.apply(_f, [void 0, 1, 2].concat(a, ["string"])))()();
// Property access expression
new b.f(1, 2, "string");
new ((_g = b.f).bind.apply(_g, [void 0, 1, 2].concat(a)))();
new ((_h = b.f).bind.apply(_h, [void 0, 1, 2].concat(a, ["string"])))();
// Parenthesised expression
new (b.f)(1, 2, "string");
new ((_j = (b.f)).bind.apply(_j, [void 0, 1, 2].concat(a)))();
new ((_k = (b.f)).bind.apply(_k, [void 0, 1, 2].concat(a, ["string"])))();
// Element access expression
new d[1].f(1, 2, "string");
new ((_l = d[1].f).bind.apply(_l, [void 0, 1, 2].concat(a)))();
new ((_m = d[1].f).bind.apply(_m, [void 0, 1, 2].concat(a, ["string"])))();
// Element access expression with a punctuated key
new e["a-b"].f(1, 2, "string");
new ((_o = e["a-b"].f).bind.apply(_o, [void 0, 1, 2].concat(a)))();
new ((_p = e["a-b"].f).bind.apply(_p, [void 0, 1, 2].concat(a, ["string"])))();
// Basic expression
new B(1, 2, "string");
new ((_q = B).bind.apply(_q, [void 0, 1, 2].concat(a)))();
new ((_r = B).bind.apply(_r, [void 0, 1, 2].concat(a, ["string"])))();
// Property access expression
new c["a-b"](1, 2, "string");
new ((_s = c["a-b"]).bind.apply(_s, [void 0, 1, 2].concat(a)))();
new ((_t = c["a-b"]).bind.apply(_t, [void 0, 1, 2].concat(a, ["string"])))();
// Parenthesised expression
new (c["a-b"])(1, 2, "string");
new ((_u = (c["a-b"])).bind.apply(_u, [void 0, 1, 2].concat(a)))();
new ((_v = (c["a-b"])).bind.apply(_v, [void 0, 1, 2].concat(a, ["string"])))();
// Element access expression
new g[1]["a-b"](1, 2, "string");
new ((_w = g[1]["a-b"]).bind.apply(_w, [void 0, 1, 2].concat(a)))();
new ((_x = g[1]["a-b"]).bind.apply(_x, [void 0, 1, 2].concat(a, ["string"])))();
// Element access expression with a punctuated key
new h["a-b"]["a-b"](1, 2, "string");
new ((_y = h["a-b"]["a-b"]).bind.apply(_y, [void 0, 1, 2].concat(a)))();
new ((_z = h["a-b"]["a-b"]).bind.apply(_z, [void 0, 1, 2].concat(a, ["string"])))();
// Element access expression with a number
new i["a-b"][1](1, 2, "string");
new ((_0 = i["a-b"][1]).bind.apply(_0, [void 0, 1, 2].concat(a)))();
new ((_1 = i["a-b"][1]).bind.apply(_1, [void 0, 1, 2].concat(a, ["string"])))();
