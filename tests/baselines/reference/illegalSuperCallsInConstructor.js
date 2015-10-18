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
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
    }
    return Base;
})();
var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var r2 = function () { return _super.call(this); };
        var r3 = function () { _super.call(this); };
        var r4 = function () { _super.call(this); };
        var r5 = {
            get foo() {
                _super.call(this);
                return 1;
            },
            set foo(v) {
                _super.call(this);
            }
        };
    }
    return Derived;
})(Base);
