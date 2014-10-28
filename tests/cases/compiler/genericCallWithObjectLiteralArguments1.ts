function foo<T>(n: { x: T; y: T }, m: T) { return m; }
// these are all errors
var x = foo({ x: 3, y: "" }, 4);
var x2 = foo<number>({ x: 3, y: "" }, 4); 
var x3 = foo<string>({ x: 3, y: "" }, 4); 
var x4 = foo<number>({ x: "", y: 4 }, "");
var x5 = foo<string>({ x: "", y: 4 }, "");