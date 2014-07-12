var a = { toString: 5 };
var b: {} = a;  // ok
var c: Object = a;  // should be error
