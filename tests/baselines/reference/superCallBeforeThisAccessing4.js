//// [superCallBeforeThisAccessing4.ts]
class D extends null {
    private _t;
    constructor() {
        this._t;
        super();
    }
}

class E extends null {
    private _t;
    constructor() {
        super();
        this._t;
    }
}

//// [superCallBeforeThisAccessing4.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        this._t;
        _this = _super.call(this) || this;
    }
    return D;
}(null));
var E = /** @class */ (function (_super) {
    __extends(E, _super);
    function E() {
        _this = _super.call(this) || this;
        this._t;
    }
    return E;
}(null));
