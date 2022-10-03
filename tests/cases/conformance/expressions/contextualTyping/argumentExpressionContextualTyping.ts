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