//// [privateStaticNotAccessibleInClodule2.js]
// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var C = (function () {
    function C() {
    }
    return C;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);

var D;
(function (D) {
    D.y = D.bar;
})(D || (D = {}));
