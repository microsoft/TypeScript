//// [tests/cases/conformance/classes/classDeclarations/classAbstractKeyword/classAbstractFactoryFunction.ts] ////

//// [classAbstractFactoryFunction.ts]
class A {}
abstract class B extends A {}

function NewA(Factory: typeof A) {
    return new A;
}

function NewB(Factory: typeof B) {
    return new B;
}

NewA(A);
NewA(B);

NewB(A);
NewB(B);

//// [classAbstractFactoryFunction.js]
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
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
function NewA(Factory) {
    return new A;
}
function NewB(Factory) {
    return new B;
}
NewA(A);
NewA(B);
NewB(A);
NewB(B);
