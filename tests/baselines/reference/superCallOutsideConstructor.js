//// [tests/cases/compiler/superCallOutsideConstructor.ts] ////

//// [superCallOutsideConstructor.ts]
class C {
    foo() { }
}
 
class D extends C {
    x = super(); 
 
    constructor() {
        super();
 
        var y = () => {
            super(); 
        }

        var y2 = function() {
            super();
        }
    }
}
 
var d = new D();


//// [superCallOutsideConstructor.js]
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
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () { };
    return C;
}());
var D = /** @class */ (function (_super) {
    __extends(D, _super);
    function D() {
        var _this = _super.call(this) || this;
        _this.x = _this = _super.call(this) || this;
        var y = function () {
            _this = _super.call(this) || this;
        };
        var y2 = function () {
            _this = _super.call(this) || this;
        };
        return _this;
    }
    return D;
}(C));
var d = new D();
