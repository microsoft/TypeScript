//// [indirectSelfReferenceGeneric.ts]
class a<T> extends b<T> { }
class b<T> extends a<T> { }

//// [indirectSelfReferenceGeneric.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var a = (function (_super) {
    __extends(a, _super);
    function a() {
        _super.apply(this, arguments);
    }
    return a;
}(b));
var b = (function (_super) {
    __extends(b, _super);
    function b() {
        _super.apply(this, arguments);
    }
    return b;
}(a));
