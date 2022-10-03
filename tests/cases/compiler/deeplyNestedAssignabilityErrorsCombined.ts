let x = { a: { b: { c: { d: { e: { f() { return { g: "hello" }; } } } } } } };
let y = { a: { b: { c: { d: { e: { f() { return { g: 12345 }; } } } } } } };
x = y;

class Ctor1 {
    g = "ok"
}

class Ctor2 {
    g = 12;
}

let x2 = { a: { b: { c: { d: { e: { f: Ctor1 } } } } } };
let y2 = { a: { b: { c: { d: { e: { f: Ctor2 } } } } } };
x2 = y2;