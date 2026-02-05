//// [tests/cases/compiler/callConstructAssignment.ts] ////

//// [callConstructAssignment.ts]
declare var foo:{ ( ):void; }

declare var bar:{ new ( ):any; }

foo = bar; // error
bar = foo; // error

//// [callConstructAssignment.js]
"use strict";
foo = bar; // error
bar = foo; // error
