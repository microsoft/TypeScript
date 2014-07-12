//// [collisionSuperAndPropertyNameAsConstuctorParameter.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var a = (function () {
    function a() {
    }
    return a;
})();

var b1 = (function (_super) {
    __extends(b1, _super);
    function b1(_super) {
        _super.call(this);
    }
    return b1;
})(a);

var b2 = (function (_super) {
    __extends(b2, _super);
    function b2(_super) {
        _super.call(this);
        this._super = _super;
    }
    return b2;
})(a);

var b3 = (function (_super) {
    __extends(b3, _super);
    function b3(_super) {
        _super.call(this);
    }
    return b3;
})(a);

var b4 = (function (_super) {
    __extends(b4, _super);
    function b4(_super) {
        _super.call(this);
        this._super = _super;
    }
    return b4;
})(a);
