//// [unqualifiedCallToClassStatic1.ts]
class Vector {
 static foo = () => {
  // 'foo' cannot be called in an unqualified manner.
  foo();
 }
}

//// [unqualifiedCallToClassStatic1.js]
var Vector = (function () {
    function Vector() {
    }
    return Vector;
}());
Vector.foo = function () {
    // 'foo' cannot be called in an unqualified manner.
    foo();
};
