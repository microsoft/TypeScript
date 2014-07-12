//// [genericClassInheritsConstructorFromNonGenericClass.ts]
class A extends B<string> { }
class B<U> extends C { }
class C {
    constructor(p: string) { }
}

//// [genericClassInheritsConstructorFromNonGenericClass.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function (_super) {
    __extends(A, _super);
    function A() {
        _super.apply(this, arguments);
    }
    return A;
})(B);
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(C);
var C = (function () {
    function C(p) {
    }
    return C;
})();
