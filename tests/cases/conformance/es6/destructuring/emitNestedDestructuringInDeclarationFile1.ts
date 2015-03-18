// @declaration: true
var { a, b: {c, d}} = { a: 10, b: { c: true, d: "hello" } };
var { y: {w: {id1: {x}, id2}, z}} = { y: { w: { id1: { x: 10 }, id2: "world" }, z: true } };

var [[j]] = [[{}]];
var [[foo, bar]] = [[10, 20, "undefined"]];
var [[foo1, bar1, [baz]]] = [[false, true, ["undefined"]]];