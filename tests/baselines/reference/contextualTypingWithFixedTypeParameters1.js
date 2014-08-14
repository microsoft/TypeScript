//// [contextualTypingWithFixedTypeParameters1.ts]
var f10: <T>(x: T, b: () => (a: T) => void, y: T) => T;
f10('', () => a => a.foo, ''); // a is string, fixed by first parameter
var r9 = f10('', () => (a => a.foo), 1); // now a should be any

//// [contextualTypingWithFixedTypeParameters1.js]
var f10;
f10('', function () { return function (a) { return a.foo; }; }, '');
var r9 = f10('', function () { return (function (a) { return a.foo; }); }, 1); // now a should be any 
