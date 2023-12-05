//// [tests/cases/compiler/autoLift2.ts] ////

//// [autoLift2.ts]
class A

{
    constructor() {
        this.foo: any;
        this.bar: any;
    }


  baz() {

     this.foo = "foo";

     this.bar = "bar";

     [1, 2].forEach((p) => this.foo);

     [1, 2].forEach((p) => this.bar);

  }

}



var a = new A();

a.baz();




//// [autoLift2.js]
var A = /** @class */ (function () {
    function A() {
        this.foo;
        any;
        this.bar;
        any;
    }
    A.prototype.baz = function () {
        var _this = this;
        this.foo = "foo";
        this.bar = "bar";
        [1, 2].forEach(function (p) { return _this.foo; });
        [1, 2].forEach(function (p) { return _this.bar; });
    };
    return A;
}());
var a = new A();
a.baz();
