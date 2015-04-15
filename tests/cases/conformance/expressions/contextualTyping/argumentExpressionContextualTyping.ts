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