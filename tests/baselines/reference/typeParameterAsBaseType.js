//// [typeParameterAsBaseType.ts]
// type parameters cannot be used as base types
// these are all errors

class C<T> extends T { }
class C2<T, U> extends U { }

interface I<T> extends T { }
interface I2<T, U> extends U { }



//// [typeParameterAsBaseType.js]
// type parameters cannot be used as base types
// these are all errors
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(T);
var C2 = (function (_super) {
    __extends(C2, _super);
    function C2() {
        _super.apply(this, arguments);
    }
    return C2;
})(U);
