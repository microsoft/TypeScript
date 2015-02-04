//// [computedPropertyNames10_ES5.ts]
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

//// [computedPropertyNames10_ES5.js]
var s;
var n;
var a;
var v = {
    [s]: function () {
    },
    [n]: function () {
    },
    [s + s]: function () {
    },
    [s + n]: function () {
    },
    [+s]: function () {
    },
    [""]: function () {
    },
    [0]: function () {
    },
    [a]: function () {
    },
    [true]: function () {
    },
    ["hello bye"]: function () {
    },
    ["hello " + a + " bye"]: function () {
    }
};
