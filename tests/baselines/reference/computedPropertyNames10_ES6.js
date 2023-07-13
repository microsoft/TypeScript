//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames10_ES6.ts] ////

//// [computedPropertyNames10_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    [s]() { },
    [n]() { },
    [s + s]() { },
    [s + n]() { },
    [+s]() { },
    [""]() { },
    [0]() { },
    [a]() { },
    [<any>true]() { },
    [`hello bye`]() { },
    [`hello ${a} bye`]() { }
}

//// [computedPropertyNames10_ES6.js]
var s;
var n;
var a;
var v = {
    [s]() { },
    [n]() { },
    [s + s]() { },
    [s + n]() { },
    [+s]() { },
    [""]() { },
    [0]() { },
    [a]() { },
    [true]() { },
    [`hello bye`]() { },
    [`hello ${a} bye`]() { }
};
