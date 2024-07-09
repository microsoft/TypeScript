// @declaration: true
function foo<T > (x: T) { return x; }

var x = foo<number>(5); // 'x' should be number