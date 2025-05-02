//// [tests/cases/compiler/extendFromAny.ts] ////

//// [extendFromAny.ts]
declare var Base: any;
class C extends Base {
    known = 1;
    static sknown = 2;
}

let c = new C();
c.known.length; // error, 'known' has no 'length' property
C.sknown.length; // error, 'sknown' has no 'length' property
c.unknown.length; // ok, unknown: any
C.sunknown.length; // ok: sunknown: any


//// [extendFromAny.js]
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
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.known = 1;
        return _this;
    }
    C.sknown = 2;
    return C;
}(Base));
var c = new C();
c.known.length; // error, 'known' has no 'length' property
C.sknown.length; // error, 'sknown' has no 'length' property
c.unknown.length; // ok, unknown: any
C.sunknown.length; // ok: sunknown: any
