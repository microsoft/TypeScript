//// [tests/cases/conformance/es6/computedProperties/computedPropertyNames49_ES5.ts] ////

//// [computedPropertyNames49_ES5.ts]
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

//// [computedPropertyNames49_ES5.js]
var _a;
var x = (_a = {
        p1: 10
    },
    Object.defineProperty(_a, 1 + 1, {
        get: function () {
            throw 10;
        },
        enumerable: false,
        configurable: true
    }),
    Object.defineProperty(_a, 1 + 1, {
        get: function () {
            return 10;
        },
        enumerable: false,
        configurable: true
    }),
    Object.defineProperty(_a, 1 + 1, {
        set: function () {
            // just throw
            throw 10;
        },
        enumerable: false,
        configurable: true
    }),
    Object.defineProperty(_a, "foo", {
        get: function () {
            if (1 == 1) {
                return 10;
            }
        },
        enumerable: false,
        configurable: true
    }),
    _a.p2 = 20,
    _a);
