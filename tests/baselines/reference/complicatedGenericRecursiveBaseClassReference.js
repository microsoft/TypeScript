//// [complicatedGenericRecursiveBaseClassReference.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var S18 = (function (_super) {
    __extends(S18, _super);
    function S18() {
        _super.apply(this, arguments);
    }
    return S18;
})(S18);
(new S18(123)).S18 = 0;
