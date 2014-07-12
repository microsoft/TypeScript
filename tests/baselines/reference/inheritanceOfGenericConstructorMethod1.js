//// [inheritanceOfGenericConstructorMethod1.ts]
class A<T> { }
class B<T> extends A<T> {}
var a = new A<Date>();
var b1 = new B(); // no error
var b2: B<Date> = new B<Date>(); // no error
var b3 = new B<Date>(); // error, could not select overload for 'new' expression


//// [inheritanceOfGenericConstructorMethod1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var A = (function () {
    function A() {
    }
    return A;
})();
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    return B;
})(A);
var a = new A();
var b1 = new B();
var b2 = new B();
var b3 = new B();
