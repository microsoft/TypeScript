//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames49_ES6.ts] ////

//// [computedPropertyNames49_ES6.ts]
var x = {
    p1: 10,
    get [1 + 1]() {
        throw 10;
    },
    get [1 + 1]() {
        return 10;
    },
    set [1 + 1]() {
        // just throw
        throw 10;
    },
    get foo() {
        if (1 == 1) {
            return 10;
        }
    },
    get foo() {
        if (2 == 2) {
            return 20;
        }
    },
    p2: 20
}

//// [computedPropertyNames49_ES6.js]
var x = {
    p1: 10,
    get [1 + 1]() {
        throw 10;
    },
    get [1 + 1]() {
        return 10;
    },
    set [1 + 1]() {
        // just throw
        throw 10;
    },
    get foo() {
        if (1 == 1) {
            return 10;
        }
    },
    get foo() {
        if (2 == 2) {
            return 20;
        }
    },
    p2: 20
};
