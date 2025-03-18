//// [tests/cases/compiler/contextualTypingWithFixedTypeParameters1.ts] ////

//// [contextualTypingWithFixedTypeParameters1.ts]
var f10: <T>(x: T, b: () => (a: T) => void, y: T) => T;
f10('', () => a => a.foo, ''); // a is ""
var r9 = f10('', () => (a => a.foo), 1); // error

//// [contextualTypingWithFixedTypeParameters1.js]
var f10;
f10('', () => a => a.foo, '');
var r9 = f10('', () => (a => a.foo), 1);
