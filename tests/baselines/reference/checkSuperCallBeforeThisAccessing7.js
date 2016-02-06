//// [checkSuperCallBeforeThisAccessing7.ts]
class Base {
    constructor(func: ()=>Base) {
    }
}
class Super extends Base {
    constructor() {
        super((() => this)); // No error
    }
}

//// [checkSuperCallBeforeThisAccessing7.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(func) {
    }
    return Base;
}());
var Super = (function (_super) {
    __extends(Super, _super);
    function Super() {
        var _this = this;
        _super.call(this, (function () { return _this; })); // No error
    }
    return Super;
}(Base));
