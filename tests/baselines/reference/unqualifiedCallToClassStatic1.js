//// [tests/cases/compiler/unqualifiedCallToClassStatic1.ts] ////

//// [unqualifiedCallToClassStatic1.ts]
class Vector {
 static foo = () => {
  // 'foo' cannot be called in an unqualified manner.
  foo();
 }
}

//// [unqualifiedCallToClassStatic1.js]
let Vector = (() => {
    class Vector {
    }
    Vector.foo = () => {
        // 'foo' cannot be called in an unqualified manner.
        foo();
    };
    return Vector;
})();
