//// [tests/cases/conformance/expressions/contextualTyping/argumentExpressionContextualTyping.ts] ////

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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// In a typed function call, argument expressions are contextually typed by their corresponding parameter types.
function foo(_a) {
    var _b = _a.x, a = _b[0], b = _b[1], _c = _a.y, c = _c.c, d = _c.d, e = _c.e;
}
function bar(_a) {
    var _b = _a.x, a = _b[0], _c = _b[1], b = _c === void 0 ? 10 : _c, _d = _a.y, c = _d.c, d = _d.d, _e = _d.e, e = _e === void 0 ? { f: 1 } : _e;
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
baz(__spreadArray(["string", 1, true], array, true)); // Error
foo(o); // Error because x has an array type namely (string|number)[]
