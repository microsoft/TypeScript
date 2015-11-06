//// [structNotExtendingClass.ts]
class C {
	foo: string;
	thing() { }
    static other() { }
}

struct D extends C { // error, struct can only extend struct
	bar: string;
}


//// [structNotExtendingClass.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C = (function () {
    function C() {
    }
    C.prototype.thing = function () { };
    C.other = function () { };
    return C;
})();
var D = (function () {
    var _D = new TypedObject.StructType({
        bar: TypedObject.string
    });
    function _ctor() {
    }
    function D() {
        var obj = new _D();
        _ctor.call(obj);
        return obj;
    }
    D._TO = _D;
    return D;
})();
