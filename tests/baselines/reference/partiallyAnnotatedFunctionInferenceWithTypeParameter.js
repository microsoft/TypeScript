//// [partiallyAnnotatedFunctionInferenceWithTypeParameter.ts]
class C {
  test: string
}

class D extends C {
  test2: string
}

declare function test<T extends C>(a: (t: T, t1: T) => void): T

declare function testRest<T extends C>(a: (t: T, t1: T, ...ts: T[]) => void): T


// exactly
test((t1: D, t2) => { t2.test2 })
test((t1, t2: D) => { t2.test2 })

// zero arg
test(() => {})

// fewer args
test((t1: D) => {})

// rest arg
test((...ts: D[]) => {})

// source function has rest arg
testRest((t1: D) => {})
testRest((t1, t2, t3) => {})
testRest((t1: D, t2, t3) => {})
testRest((t1, t2: D, t3) => {})
testRest((t2: D, ...t3) => {})
testRest((t2, ...t3: D[]) => {})


//// [partiallyAnnotatedFunctionInferenceWithTypeParameter.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return D;
}(C));
// exactly
test(function (t1, t2) { t2.test2; });
test(function (t1, t2) { t2.test2; });
// zero arg
test(function () { });
// fewer args
test(function (t1) { });
// rest arg
test(function () {
    var ts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        ts[_i] = arguments[_i];
    }
});
// source function has rest arg
testRest(function (t1) { });
testRest(function (t1, t2, t3) { });
testRest(function (t1, t2, t3) { });
testRest(function (t1, t2, t3) { });
testRest(function (t2) {
    var t3 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        t3[_i - 1] = arguments[_i];
    }
});
testRest(function (t2) {
    var t3 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        t3[_i - 1] = arguments[_i];
    }
});
