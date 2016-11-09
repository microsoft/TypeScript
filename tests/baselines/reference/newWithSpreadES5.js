//// [newWithSpreadES5.ts]

function f(x: number, y: number, ...z: string[]) {
}

function f2(...x: string[]) {}

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

//// [newWithSpreadES5.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
new (f.bind.apply(f, __spread([void 0, 1, 2], a)))();
new (f.bind.apply(f, __spread([void 0, 1, 2], a, ["string"])))();
// Multiple spreads arguments
new (f2.bind.apply(f2, __spread([void 0], a, a)))();
new (f.bind.apply(f, __spread([void 0, 1, 2], a, a)))();
// Call expression
new f(1, 2, "string")();
new (f.bind.apply(f, __spread([void 0, 1, 2], a)))()();
new (f.bind.apply(f, __spread([void 0, 1, 2], a, ["string"])))()();
// Property access expression
new b.f(1, 2, "string");
new ((_a = b.f).bind.apply(_a, __spread([void 0, 1, 2], a)))();
new ((_b = b.f).bind.apply(_b, __spread([void 0, 1, 2], a, ["string"])))();
// Parenthesised expression
new (b.f)(1, 2, "string");
new ((_c = (b.f)).bind.apply(_c, __spread([void 0, 1, 2], a)))();
new ((_d = (b.f)).bind.apply(_d, __spread([void 0, 1, 2], a, ["string"])))();
// Element access expression
new d[1].f(1, 2, "string");
new ((_e = d[1].f).bind.apply(_e, __spread([void 0, 1, 2], a)))();
new ((_f = d[1].f).bind.apply(_f, __spread([void 0, 1, 2], a, ["string"])))();
// Element access expression with a punctuated key
new e["a-b"].f(1, 2, "string");
new ((_g = e["a-b"].f).bind.apply(_g, __spread([void 0, 1, 2], a)))();
new ((_h = e["a-b"].f).bind.apply(_h, __spread([void 0, 1, 2], a, ["string"])))();
// Basic expression
new B(1, 2, "string");
new (B.bind.apply(B, __spread([void 0, 1, 2], a)))();
new (B.bind.apply(B, __spread([void 0, 1, 2], a, ["string"])))();
// Property access expression
new c["a-b"](1, 2, "string");
new ((_j = c["a-b"]).bind.apply(_j, __spread([void 0, 1, 2], a)))();
new ((_k = c["a-b"]).bind.apply(_k, __spread([void 0, 1, 2], a, ["string"])))();
// Parenthesised expression
new (c["a-b"])(1, 2, "string");
new ((_l = (c["a-b"])).bind.apply(_l, __spread([void 0, 1, 2], a)))();
new ((_m = (c["a-b"])).bind.apply(_m, __spread([void 0, 1, 2], a, ["string"])))();
// Element access expression
new g[1]["a-b"](1, 2, "string");
new ((_o = g[1]["a-b"]).bind.apply(_o, __spread([void 0, 1, 2], a)))();
new ((_p = g[1]["a-b"]).bind.apply(_p, __spread([void 0, 1, 2], a, ["string"])))();
// Element access expression with a punctuated key
new h["a-b"]["a-b"](1, 2, "string");
new ((_q = h["a-b"]["a-b"]).bind.apply(_q, __spread([void 0, 1, 2], a)))();
new ((_r = h["a-b"]["a-b"]).bind.apply(_r, __spread([void 0, 1, 2], a, ["string"])))();
// Element access expression with a number
new i["a-b"][1](1, 2, "string");
new ((_s = i["a-b"][1]).bind.apply(_s, __spread([void 0, 1, 2], a)))();
new ((_t = i["a-b"][1]).bind.apply(_t, __spread([void 0, 1, 2], a, ["string"])))();
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
