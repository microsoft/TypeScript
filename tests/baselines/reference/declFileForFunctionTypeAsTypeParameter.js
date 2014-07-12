//// [declFileForFunctionTypeAsTypeParameter.ts]

class X<T> {
}
class C extends X<() => number> {
}
interface I extends X<() => number> {
}



//// [declFileForFunctionTypeAsTypeParameter.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
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


////[declFileForFunctionTypeAsTypeParameter.d.ts]
declare class X<T> {
}
declare class C extends X<() => number> {
}
interface I extends X<() => number> {
}
