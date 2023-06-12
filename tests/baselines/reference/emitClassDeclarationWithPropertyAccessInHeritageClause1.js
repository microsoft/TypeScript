//// [tests/cases/conformance/es6/classDeclaration/emitClassDeclarationWithPropertyAccessInHeritageClause1.ts] ////

//// [emitClassDeclarationWithPropertyAccessInHeritageClause1.ts]
class B {}
function foo() {
    return {B: B};
}
class C extends (foo()).B {}

//// [emitClassDeclarationWithPropertyAccessInHeritageClause1.js]
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
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function foo() {
    return { B: B };
}
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return C;
}((foo()).B));
