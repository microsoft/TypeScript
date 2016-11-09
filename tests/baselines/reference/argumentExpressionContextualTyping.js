//// [argumentExpressionContextualTyping.ts]
// In a typed function call, argument expressions are contextually typed by their corresponding parameter types.
function foo({x: [a, b], y: {c, d, e}}) { }
function bar({x: [a, b = 10], y: {c, d, e = { f:1 }}}) { }
function baz(x: [string, number, boolean]) { }

var o = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
var o1: { x: [string, number], y: { c: boolean, d: string, e: number } } = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
foo(o1); // Not error since x has contextual type of tuple namely [string, number]
foo({ x: ["string", 1], y: { c: true, d: "world", e: 3 } }); // Not error

var array = ["string", 1, true];
var tuple: [string, number, boolean] = ["string", 1, true];
baz(tuple);
baz(["string", 1, true]);

baz(array);                          // Error
baz(["string", 1, true, ...array]);  // Error
foo(o);                              // Error because x has an array type namely (string|number)[]

//// [argumentExpressionContextualTyping.js]
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
// In a typed function call, argument expressions are contextually typed by their corresponding parameter types.
function foo(_a) {
    var _b = __read(_a.x, 2), a = _b[0], b = _b[1], _c = _a.y, c = _c.c, d = _c.d, e = _c.e;
}
function bar(_a) {
    var _b = __read(_a.x, 2), a = _b[0], _c = _b[1], b = _c === void 0 ? 10 : _c, _d = _a.y, c = _d.c, d = _d.d, _e = _d.e, e = _e === void 0 ? { f: 1 } : _e;
}
function baz(x) { }
var o = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
var o1 = { x: ["string", 1], y: { c: true, d: "world", e: 3 } };
foo(o1); // Not error since x has contextual type of tuple namely [string, number]
foo({ x: ["string", 1], y: { c: true, d: "world", e: 3 } }); // Not error
var array = ["string", 1, true];
var tuple = ["string", 1, true];
baz(tuple);
baz(["string", 1, true]);
baz(array); // Error
baz(__spread(["string", 1, true], array)); // Error
foo(o); // Error because x has an array type namely (string|number)[]
