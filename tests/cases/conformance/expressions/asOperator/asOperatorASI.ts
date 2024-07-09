class Foo { }
declare function as(...args: any[]);

// Example 1
var x = 10
as `Hello world`; // should not error

// Example 2
var y = 20
as(Foo); // should emit
