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
var Foo = (function () {
    function Foo() {
    }
    var proto_1 = Foo.prototype;
    proto_1.f1 = function () {
        if (this.
        )
            ;
    };
    proto_1.f2 = function () {
    };
    proto_1.f3 = function () {
    };
    return Foo;
}());
