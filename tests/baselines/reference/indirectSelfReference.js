//// [indirectSelfReference.ts]
class a extends b{ }
class b extends a{ }

//// [indirectSelfReference.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = (function (_super) {
    __extends(a, _super);
    function a() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return a;
}(b));
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        var _this = _super.apply(this, arguments) || this;
        return _this;
    }
    return b;
}(a));
