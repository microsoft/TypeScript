// @target: es2015
// @strict: false
declare var f10: <T>(x: T, b: () => (a: T) => void, y: T) => T;
f10('', () => a => a.foo, ''); // a is ""
var r9 = f10('', () => (a => a.foo), 1); // error