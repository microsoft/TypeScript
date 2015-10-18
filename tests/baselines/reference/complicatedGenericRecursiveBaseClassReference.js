//// [complicatedGenericRecursiveBaseClassReference.ts]
class S18<B, A, C> extends S18<A[], { S19: A; (): A }[], C[]>
{
}
(new S18(123)).S18 = 0;


//// [complicatedGenericRecursiveBaseClassReference.js]
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var S18 = (function (_super) {
    __extends(S18, _super);
    function S18() {
        _super.apply(this, arguments);
    }
    return S18;
})(S18);
(new S18(123)).S18 = 0;
