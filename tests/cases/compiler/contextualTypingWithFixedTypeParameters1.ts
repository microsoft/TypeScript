var f10: <T>(x: T, b: () => (a: T) => void, y: T) => T;
f10('', () => a => a.foo, ''); // a is string, fixed by first parameter
var r9 = f10('', () => (a => a.foo), 1); // now a should be any