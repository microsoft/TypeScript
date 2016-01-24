//// [overridingPrivateStaticMembers.ts]
class Base2 {
    private static y: { foo: string };
}
 
class Derived2 extends Base2 {
    private static y: { foo: string; bar: string; };
}

//// [overridingPrivateStaticMembers.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Base2 = (function () {
    function Base2() {
    }
    return Base2;
}());
var Derived2 = (function (_super) {
    __extends(Derived2, _super);
    function Derived2() {
        _super.apply(this, arguments);
    }
    return Derived2;
}(Base2));
