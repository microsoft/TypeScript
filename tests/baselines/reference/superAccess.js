//// [superAccess.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MyBase = (function () {
    function MyBase() {
        this.S2 = "test";
        this.f = function () {
            return 5;
        };
    }
    MyBase.S1 = 5;
    return MyBase;
})();

var MyDerived = (function (_super) {
    __extends(MyDerived, _super);
    function MyDerived() {
        _super.apply(this, arguments);
    }
    MyDerived.prototype.foo = function () {
        var l3 = _super.prototype.S1;
        var l4 = _super.prototype.S2;
        var l5 = _super.prototype.f.call(this);
    };
    return MyDerived;
})(MyBase);
