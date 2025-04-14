//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingPrimitive2.ts] ////

//// [classExtendingPrimitive2.ts]
// classes cannot extend primitives

class C4a extends void {}
class C5a extends null { }

//// [classExtendingPrimitive2.js]
// classes cannot extend primitives
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
var C4a = /** @class */ (function () {
    function C4a() {
    }
    return C4a;
}());
void {};
var C5a = /** @class */ (function (_super) {
    __extends(C5a, _super);
    function C5a() {
    }
    return C5a;
}(null));
