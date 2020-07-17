//// [override1.ts]
class B {
    foo (v: string) {

    }
}

class D extends B {
    override foo (v: string) {

    }

    override bar(v: string) {
        
    }
}

class C {
    override foo(v: string) {

    }
}

//// [override1.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.foo = function (v) {
    };
    return B;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.foo = function (v) {
    };
    D.prototype.bar = function (v) {
    };
    return D;
}(B));
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function (v) {
    };
    return C;
}());
