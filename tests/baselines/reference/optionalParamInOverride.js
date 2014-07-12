//// [optionalParamInOverride.ts]
class Z {
    public func(): void { }
}
class Y extends Z {
    public func(value?: any): void { }
}


//// [optionalParamInOverride.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Z = (function () {
    function Z() {
    }
    Z.prototype.func = function () {
    };
    return Z;
})();
var Y = (function (_super) {
    __extends(Y, _super);
    function Y() {
        _super.apply(this, arguments);
    }
    Y.prototype.func = function (value) {
    };
    return Y;
})(Z);
