//// [superCallWithMissingBaseClass.ts]
class Foo extends Bar {
    m1() {
        return super.m1();
    }

    static m2() {
        return super.m2();
    }
}

//// [superCallWithMissingBaseClass.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Foo = (function (_super) {
    __extends(Foo, _super);
    function Foo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Foo.prototype.m1 = function () {
        return _super.prototype.m1.call(this);
    };
    Foo.m2 = function () {
        return _super.m2.call(this);
    };
    return Foo;
}(Bar));
