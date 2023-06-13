//// [tests/cases/conformance/es6/classDeclaration/superCallBeforeThisAccessing1.ts] ////

//// [superCallBeforeThisAccessing1.ts]
declare var Factory: any

class Base {
    constructor(c) { }
}
class D extends Base {
    private _t;
    constructor() {
        super(i);
        var s = {
            t: this._t
        }
        var i = Factory.create(s);
    }
}


//// [superCallBeforeThisAccessing1.js]
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
var Base = /** @class */ (function () {
    function Base(c) {
    }
    return Base;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super.call(this, i) || this;
        var s = {
            t: _this._t
        };
        var i = Factory.create(s);
        return _this;
    }
    return D;
}(Base));
