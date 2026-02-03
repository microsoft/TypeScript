//// [tests/cases/compiler/superCallAssignResult.ts] ////

//// [superCallAssignResult.ts]
class E {
    constructor(arg: any) { }
}

class H extends E {
    constructor() {
        var x = super(5); // Should be of type void, not E.
        x = 5;
    }
}

//// [superCallAssignResult.js]
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
var E = /** @class */ (function () {
    function E(arg) {
    }
    return E;
}());
var H = /** @class */ (function (_super) {
    __extends(H, _super);
    function H() {
        var _this = this;
        var x = _this = _super.call(this, 5) || this; // Should be of type void, not E.
        x = 5;
        return _this;
    }
    return H;
}(E));
