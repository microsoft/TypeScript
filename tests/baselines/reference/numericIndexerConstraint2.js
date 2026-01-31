//// [tests/cases/compiler/numericIndexerConstraint2.ts] ////

//// [numericIndexerConstraint2.ts]
class Foo { foo() { } }
declare var x: { [index: string]: Foo; };
var a: { one: number; } = { one: 1 };
x = a;

//// [numericIndexerConstraint2.js]
class Foo {
    foo() { }
}
var a = { one: 1 };
x = a;
