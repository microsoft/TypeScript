// @declaration: true
function foo<T > (x: T) { return x; }

var x = foo(5); // 'x' should be number