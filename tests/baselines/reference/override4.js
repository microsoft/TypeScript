//// [tests/cases/conformance/override/override4.ts] ////

//// [override4.ts]
class B {
    p1: number = 1;
    p2: number = 1;
    p3: () => void;
    p4: () => void;
    foo (v: string) {}
    fooo (v: string) {}
}

class D extends B {
    p1: number = 2;
    override p2: number = 3;
    p3: () => void;
    override p4: () => void;
    override foo (v: string) {}

    fooo (v: string) {}

}

class DD extends B {
    override foo: () => void
    fooo: () => void;
}

//// [override4.js]
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
var B = /** @class */ (function () {
    function B() {
        this.p1 = 1;
        this.p2 = 1;
    }
    B.prototype.foo = function (v) { };
    B.prototype.fooo = function (v) { };
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.p1 = 2;
        _this.p2 = 3;
        return _this;
    }
    D.prototype.foo = function (v) { };
    D.prototype.fooo = function (v) { };
    return D;
}(B));
var DD = /** @class */ (function (_super) {
    __extends(DD, _super);
    function DD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DD;
}(B));


//// [override4.d.ts]
declare class B {
    p1: number;
    p2: number;
    p3: () => void;
    p4: () => void;
    foo(v: string): void;
    fooo(v: string): void;
}
declare class D extends B {
    p1: number;
    p2: number;
    p3: () => void;
    p4: () => void;
    foo(v: string): void;
    fooo(v: string): void;
}
declare class DD extends B {
    foo: () => void;
    fooo: () => void;
}
