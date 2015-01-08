//// [tests/cases/compiler/__extendsMultifile.ts] ////

//// [foo.ts]

declare var __extends;

//// [bar.ts]
class A { }
class B extends A { }


//// [foo.js]
//// [bar.js]
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
