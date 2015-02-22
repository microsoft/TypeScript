//// [computedPropertyNames11_ES6.ts]
var s: string;
var n: number;
var a: any;
var v = {
    get [s]() { return 0; },
    set [n](v) { },
    get [s + s]() { return 0; },
    set [s + n](v) { },
    get [+s]() { return 0; },
    set [""](v) { },
    get [0]() { return 0; },
    set [a](v) { },
    get [<any>true]() { return 0; },
    set [`hello bye`](v) { },
    get [`hello ${a} bye`]() { return 0; }
}

//// [computedPropertyNames11_ES6.js]
var s;
var n;
var a;
var v = {
    get [s]() { return 0; },
    set [n](v) { },
    get [s + s]() { return 0; },
    set [s + n](v) { },
    get [+s]() { return 0; },
    set [""](v) { },
    get [0]() { return 0; },
    set [a](v) { },
    get [true]() { return 0; },
    set [`hello bye`](v) { },
    get [`hello ${a} bye`]() { return 0; }
};
