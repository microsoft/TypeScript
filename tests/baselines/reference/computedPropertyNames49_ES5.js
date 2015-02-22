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
var x = (_a = {
    p1: 10
}, _a.p1 =
10, _a[1 + 1] = Object.defineProperty({ get: function () {
        throw 10;
    }, enumerable: true, configurable: true }), _a[1 + 1] = Object.defineProperty({ get: function () {
        return 10;
    }, enumerable: true, configurable: true }), _a[1 + 1] = Object.defineProperty({ set: function () {
        // just throw
        throw 10;
    }, enumerable: true, configurable: true }), _a.foo = Object.defineProperty({ get: function () {
        if (1 == 1) {
            return 10;
        }
    }, enumerable: true, configurable: true }), _a.p2 =
20,
_a);
var _a;
