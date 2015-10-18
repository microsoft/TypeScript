//// [declFileForFunctionTypeAsTypeParameter.ts]

class X<T> {
}
class C extends X<() => number> {
}
interface I extends X<() => number> {
}



//// [declFileForFunctionTypeAsTypeParameter.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var X = (function () {
    function X() {
    }
    return X;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(X);


//// [declFileForFunctionTypeAsTypeParameter.d.ts]
declare class X<T> {
}
declare class C extends X<() => number> {
}
interface I extends X<() => number> {
}
