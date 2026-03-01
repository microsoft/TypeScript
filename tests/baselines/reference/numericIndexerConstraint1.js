//// [tests/cases/compiler/numericIndexerConstraint1.ts] ////

//// [numericIndexerConstraint1.ts]
class Foo { foo() { } }
declare var x: { [index: string]: number; };
var result: Foo = x["one"]; // error


//// [numericIndexerConstraint1.js]
"use strict";
class Foo {
    foo() { }
}
var result = x["one"]; // error
