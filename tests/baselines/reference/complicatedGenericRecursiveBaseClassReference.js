//// [tests/cases/compiler/complicatedGenericRecursiveBaseClassReference.ts] ////

//// [complicatedGenericRecursiveBaseClassReference.ts]
class S18<B, A, C> extends S18<A[], { S19: A; (): A }[], C[]>
{
}
(new S18(123)).S18 = 0;


//// [complicatedGenericRecursiveBaseClassReference.js]
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
var S18 = /** @class */ (function (_super) {
    __extends(S18, _super);
    function S18() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return S18;
}(S18));
(new S18(123)).S18 = 0;
