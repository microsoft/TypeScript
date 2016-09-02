//// [superCallBeforeThisAccessing8.ts]
class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        let x = {
            k: super(undefined), 
            j: this._t,  // no error
        }
    }
}


//// [superCallBeforeThisAccessing8.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base = (function () {
    function Base(c) {
    }
    return Base;
}());
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this;
        var x = {
            k: _this = _super.call(this, undefined) || this,
            j: _this._t
        };
        return _this;
    }
    return D;
}(Base));
