//// [superCallAssignResult.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var E = (function () {
    function E(arg) {
    }
    return E;
})();

var H = (function (_super) {
    __extends(H, _super);
    function H() {
        var x = _super.call(this, 5);
        x = 5;
    }
    return H;
})(E);
