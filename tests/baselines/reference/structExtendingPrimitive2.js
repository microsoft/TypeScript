//// [structExtendingPrimitive2.ts]
// structes cannot extend primitives

struct C4a extends void {}
struct C5a extends null { }

//// [structExtendingPrimitive2.js]
// structes cannot extend primitives
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var C4a = (function () {
    var _C4a = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C4a() {
        var obj = new _C4a();
        _ctor.call(obj);
        return obj;
    }
    C4a._TO = _C4a;
    return C4a;
})();
void {};
var C5a = (function () {
    var _C5a = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C5a() {
        var obj = new _C5a();
        _ctor.call(obj);
        return obj;
    }
    C5a._TO = _C5a;
    return C5a;
})();
