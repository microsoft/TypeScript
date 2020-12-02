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
    var Foo_prototype = Foo.prototype;
    Foo_prototype.f1 = function () {
        if (this.
        )
            ;
    };
    Foo_prototype.f2 = function () {
    };
    Foo_prototype.f3 = function () {
    };
    return Foo;
}());
