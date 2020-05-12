//// [emitCodeBeforeSuperCall2.ts]
// TODO: With false, master is correct for `Test` but incorrect for `Sub`.
// `Test` is correct because classic emit doesn't emit for definition and `Test`
// doesn't need to emit any code for initialisation because it's already
// part of the user code


class BaseA {
    public constructor(public x: number) { }
}
class DerivedA extends BaseA {
    constructor(public x: number) { super(x); }
}


//// [emitCodeBeforeSuperCall2.js]
// TODO: With false, master is correct for `Test` but incorrect for `Sub`.
// `Test` is correct because classic emit doesn't emit for definition and `Test`
// doesn't need to emit any code for initialisation because it's already
// part of the user code
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseA = /** @class */ (function () {
    function BaseA(x) {
        this.x = x;
    }
    return BaseA;
}());
var DerivedA = /** @class */ (function (_super) {
    __extends(DerivedA, _super);
    function DerivedA(x) {
        var _this = this;
        _this.x = x;
        _this = _super.call(this, x) || this;
        return _this;
    }
    return DerivedA;
}(BaseA));
