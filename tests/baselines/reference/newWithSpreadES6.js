//// [tests/cases/conformance/expressions/functionCalls/newWithSpreadES6.ts] ////

//// [newWithSpreadES6.ts]
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

//// [newWithSpreadES6.js]
function f(x, y, ...z) {
}
function f2(...x) {
}
class B {
    constructor(x, y, ...z) { }
}
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
new f(1, 2, ...a);
new f(1, 2, ...a, "string");
// Multiple spreads arguments
new f2(...a, ...a);
new f(1, 2, ...a, ...a);
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
