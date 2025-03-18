//// [tests/cases/conformance/expressions/asOperator/asOperatorASI.ts] ////

//// [asOperatorASI.ts]
class Foo { }
declare function as(...args: any[]);

// Example 1
var x = 10
as `Hello world`; // should not error

// Example 2
var y = 20
as(Foo); // should emit


//// [asOperatorASI.js]
class Foo {
}
var x = 10;
as `Hello world`;
var y = 20;
as(Foo);
