//// [readonlyAssignmentInSubclassOfClassExpression.ts]
class C extends (class {} as new () => Readonly<{ attrib: number }>) {
    constructor() {
        super()
        this.attrib = 2
    }
}


//// [readonlyAssignmentInSubclassOfClassExpression.js]
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
        var _this = _super.call(this) || this;
        _this.attrib = 2;
        return _this;
    }
    return C;
}(/** @class */ (function () {
    function class_1() {
    }
    return class_1;
}())));
