//// [mergedInterfacesWithInheritedPrivates3.js]
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

var C2 = (function () {
    function C2() {
    }
    return C2;
})();

var D = (function (_super) {
    __extends(D, _super);
    function D() {
        _super.apply(this, arguments);
    }
    return D;
})(C);

var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        return C;
    })();

    var C2 = (function () {
        function C2() {
        }
        return C2;
    })();
})(M || (M = {}));
