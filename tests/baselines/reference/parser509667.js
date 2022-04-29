//// [parser509667.ts]
class Foo {
   f1() {
      if (this.
   }

   f2() {
   }

   f3() {
   }
}

//// [parser509667.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.f1 = function () {
        if (this.
        )
            ;
    };
    Foo.prototype.f2 = function () {
    };
    Foo.prototype.f3 = function () {
    };
    return Foo;
}());
