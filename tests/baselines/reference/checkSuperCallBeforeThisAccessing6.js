//// [checkSuperCallBeforeThisAccessing6.ts]
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        (() => this);  // No Error
        super();
    }
}

//// [checkSuperCallBeforeThisAccessing6.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
    }
    return Base;
}());
var Super = (function (_super) {
    __extends(Super, _super);
    function Super() {
        var _this = this;
        (function () { return _this; }); // No Error
        _super.call(this);
    }
    return Super;
}(Base));
