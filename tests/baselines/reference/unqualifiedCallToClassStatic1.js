//// [unqualifiedCallToClassStatic1.ts]
class Vector {
 static foo = () => {
  // 'foo' cannot be called in an unqualified manner.
  foo();
 }
}

//// [unqualifiedCallToClassStatic1.js]
var Vector = /** @class */ (function () {
    function Vector() {
    }
    (function () {
        Vector.foo = function () {
            // 'foo' cannot be called in an unqualified manner.
            foo();
        };
    }).call(Vector);
    return Vector;
}());
