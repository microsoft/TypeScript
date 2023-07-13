//// [tests/cases/compiler/illegalSuperCallsInConstructor.ts] ////

//// [illegalSuperCallsInConstructor.ts]
class Base {
    x: string;
}
 
class Derived extends Base {
    constructor() {
        var r2 = () => super();
        var r3 = () => { super(); }
        var r4 = function () { super(); }
        var r5 = {
            get foo() {
                super();
                return 1;
            },
            set foo(v: number) {
                super();
            }
        }
    }
}

//// [illegalSuperCallsInConstructor.js]
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
var Base = /** @class */ (function () {
    function Base() {
    }
    return Base;
}());
var Derived = /** @class */ (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = this;
        var r2 = function () { return _this = _super.call(this) || this; };
        var r3 = function () { _this = _super.call(this) || this; };
        var r4 = function () { _this = _super.call(this) || this; };
        var r5 = {
            get foo() {
                _this = _super.call(this) || this;
                return 1;
            },
            set foo(v) {
                _this = _super.call(this) || this;
            }
        };
        return _this;
    }
    return Derived;
}(Base));
