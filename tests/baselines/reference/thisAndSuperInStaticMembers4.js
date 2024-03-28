//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/thisAndSuperInStaticMembers4.ts] ////

//// [thisAndSuperInStaticMembers4.ts]
declare class B {
    static a: any;
    static f(): number;
    a: number;
    f(): number;
}

class C extends B {
    static x: any = undefined!;
    static y1 = this.x;
    static y2 = this.x();
    static y3 = this?.x();
    static y4 = this[("x")]();
    static y5 = this?.[("x")]();
    static z3 = super.f();
    static z4 = super["f"]();
    
    // these should be unaffected
    x = 1;
    y = this.x;
    z = super.f();
}

//// [thisAndSuperInStaticMembers4.js]
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
        // these should be unaffected
        _this.x = 1;
        _this.y = _this.x;
        _this.z = _super.prototype.f.call(_this);
        return _this;
    }
    var _a;
    _a = C;
    C.x = undefined;
    C.y1 = _a.x;
    C.y2 = _a.x();
    C.y3 = _a === null || _a === void 0 ? void 0 : _a.x();
    C.y4 = _a[("x")]();
    C.y5 = _a === null || _a === void 0 ? void 0 : _a[("x")]();
    C.z3 = _super.f.call(_a);
    C.z4 = _super["f"].call(_a);
    return C;
}(B));
