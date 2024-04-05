//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames1_ES6.ts] ////

//// [computedPropertyNames1_ES6.ts]
var v = {
    get [0 + 1]() { return 0 },
    set [0 + 1](v: string) { } //No error
}

//// [computedPropertyNames1_ES6.js]
var v = {
    get [0 + 1]() { return 0; },
    set [0 + 1](v) { } //No error
};
