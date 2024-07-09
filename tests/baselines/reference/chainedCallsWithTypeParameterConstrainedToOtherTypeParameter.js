//// [tests/cases/compiler/chainedCallsWithTypeParameterConstrainedToOtherTypeParameter.ts] ////

//// [chainedCallsWithTypeParameterConstrainedToOtherTypeParameter.ts]
class Chain<T extends A> {
    constructor(public value: T) { }
    then<S extends T>(cb: (x: T) => S): Chain<S> {
        return null;
    }
}

class A {
    x;
}
class B extends A {
    y;
}
class C extends B {
    z;
}

// Ok to go down the chain, but error to try to climb back up
(new Chain(new A)).then(a => new B).then(b => new C).then(c => new B).then(b => new A);

//// [chainedCallsWithTypeParameterConstrainedToOtherTypeParameter.js]
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
var Chain = /** @class */ (function () {
    function Chain(value) {
        this.value = value;
    }
    Chain.prototype.then = function (cb) {
        return null;
    };
    return Chain;
}());
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}(B));
// Ok to go down the chain, but error to try to climb back up
(new Chain(new A)).then(function (a) { return new B; }).then(function (b) { return new C; }).then(function (c) { return new B; }).then(function (b) { return new A; });
