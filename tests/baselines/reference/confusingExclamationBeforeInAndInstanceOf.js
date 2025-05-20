//// [tests/cases/compiler/confusingExclamationBeforeInAndInstanceOf.ts] ////

//// [confusingExclamationBeforeInAndInstanceOf.ts]
declare let a: any;
declare let b: any;

a! instanceof b; // should work
a!instanceof b; // should work
a/**/!instanceof b; // should work
a!/**/instanceof b; // should work
a !instanceof b; // should error
a	!instanceof b; // should error

a! in b; // should work
a!in b; // should work
a/**/!in b; // should work
a!/**/in b; // should work
a !in b; // should error
a	!in b; // should error


//// [confusingExclamationBeforeInAndInstanceOf.js]
a instanceof b; // should work
a instanceof b; // should work
a /**/ instanceof b; // should work
a /**/ instanceof b; // should work
a instanceof b; // should error
a instanceof b; // should error
a in b; // should work
a in b; // should work
a /**/ in b; // should work
a /**/ in b; // should work
a in b; // should error
a in b; // should error
