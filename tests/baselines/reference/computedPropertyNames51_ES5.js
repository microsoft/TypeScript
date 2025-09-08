//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames51_ES5.ts] ////

//// [computedPropertyNames51_ES5.ts]
function f<T, K extends keyof T>() {
    var t: T;
    var k: K;
    var v = {
        [t]: 0,
        [k]: 1
    };
}


//// [computedPropertyNames51_ES5.js]
function f() {
    var t;
    var k;
    var v = {
        [t]: 0,
        [k]: 1
    };
}
