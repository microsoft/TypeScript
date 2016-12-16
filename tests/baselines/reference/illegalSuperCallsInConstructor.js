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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
}());
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this;
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
