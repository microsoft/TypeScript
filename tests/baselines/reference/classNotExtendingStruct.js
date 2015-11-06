//// [classNotExtendingStruct.ts]
struct S {
	bar: string;
}

class C extends S { // error, class may only extend class
	foo: string;
}


//// [classNotExtendingStruct.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var S = (function () {
    var _S = new TypedObject.StructType({
        bar: TypedObject.string
    });
    function _ctor() {
    }
    function S() {
        var obj = new _S();
        _ctor.call(obj);
        return obj;
    }
    S._TO = _S;
    return S;
})();
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        _super.apply(this, arguments);
    }
    return C;
})(S);
