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
var Foo = (function () {
    function Foo() {
    }
    return Foo;
}());
// Example 1
var x = 10;
(_a = ["Hello world"], _a.raw = ["Hello world"], as(_a)); // should not error
// Example 2
var y = 20;
as(Foo); // should emit
var _a;
