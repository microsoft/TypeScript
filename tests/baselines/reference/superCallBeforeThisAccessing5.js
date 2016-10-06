//// [superCallBeforeThisAccessing5.ts]
class D extends null {
    private _t;
    constructor() {
        this._t;  // No error
    }
}


//// [superCallBeforeThisAccessing5.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var D = (function (_super) {
    __extends(D, _super);
    function D() {
        var _this;
        _this._t; // No error
        return _this;
    }
    return D;
}(null));
