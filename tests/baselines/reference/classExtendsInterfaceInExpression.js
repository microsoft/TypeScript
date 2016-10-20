//// [classExtendsInterfaceInExpression.ts]
interface A {}

function factory(a: any): {new(): Object} {
  return null;
}

class C extends factory(A) {}


//// [classExtendsInterfaceInExpression.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function factory(a) {
    return null;
}
var C = (function (_super) {
    __extends(C, _super);
    function C() {
        return _super.apply(this, arguments) || this;
    }
    return C;
}(factory(A)));
