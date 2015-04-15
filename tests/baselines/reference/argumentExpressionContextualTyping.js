//// [argumentExpressionContextualTyping.ts]
function foo({x: [a, b], y: {c, d, e}}) { }
function bar({x: [a, b = 10], y: {c, d, e = { f:1 }}}) { }
function baz(x: [string, number, boolean]) { }

var o = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
var o1: { x: [string, number], y: { c: boolean, d: string, e: number } } = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
foo(o); // error because ["string", 1] has an array type
foo(o1); // not error since contextual type of tuple is applied to ["string", 1]
foo({ x: ["string", 1], y: { c: true, d: "world", e: 3 } }); // not error

var array = ["string", 1, true];
var tuple: [string, number, boolean] = ["string", 1, true];
baz(array);  // error
baz(tuple);
baz(["string", 1, true]);
baz(["string", 1, true, ...array]);  // error

//// [argumentExpressionContextualTyping.js]
function foo(_a) {
    var _b = _a.x, a = _b[0], b = _b[1], _c = _a.y, c = _c.c, d = _c.d, e = _c.e;
}
function bar(_a) {
    var _b = _a.x, a = _b[0], _c = _b[1], b = _c === void 0 ? 10 : _c, _d = _a.y, c = _d.c, d = _d.d, _e = _d.e, e = _e === void 0 ? { f: 1 } : _e;
}
function baz(x) { }
var o = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
var o1 = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
foo(o); // error because ["string", 1] has an array type
foo(o1); // not error since contextual type of tuple is applied to ["string", 1]
foo({ x: ["string", 1], y: { c: true, d: "world", e: 3 } }); // not error
var array = ["string", 1, true];
var tuple = ["string", 1, true];
baz(array); // error
baz(tuple);
baz(["string", 1, true]);
baz(["string", 1, true].concat(array)); // error
