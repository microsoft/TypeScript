//// [tests/cases/compiler/callConstructAssignment.ts] ////

//// [callConstructAssignment.ts]
var foo:{ ( ):void; }

var bar:{ new ( ):any; }

foo = bar; // error
bar = foo; // error

//// [callConstructAssignment.js]
var foo;
var bar;
foo = bar; // error
bar = foo; // error
