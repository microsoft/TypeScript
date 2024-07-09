//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames9_ES6.ts] ////

//// [computedPropertyNames9_ES6.ts]
function f(s: string): string;
function f(n: number): number;
function f<T>(x: T): T;
function f(x): any { }

var v = {
    [f("")]: 0,
    [f(0)]: 0,
    [f(true)]: 0
}

//// [computedPropertyNames9_ES6.js]
function f(x) { }
var v = {
    [f("")]: 0,
    [f(0)]: 0,
    [f(true)]: 0
};
