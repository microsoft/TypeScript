//// [extendAndImplementTheSameBaseType2.ts]
class C<T> {
    foo: number
    bar(): T {
        return null;
    }
}
class D extends C<string> implements C<number> {
    baz() { }
}

var d: D = new D();
var r: string = d.foo;
var r2: number = d.foo;

var r3: string = d.bar();
var r4: number = d.bar();

//// [extendAndImplementTheSameBaseType2.js]
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
    C.prototype.bar = function () {
        return null;
    };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    D.prototype.baz = function () { };
    return D;
}(C));
var d = new D();
var r = d.foo;
var r2 = d.foo;
var r3 = d.bar();
var r4 = d.bar();
