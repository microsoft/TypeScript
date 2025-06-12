//// [tests/cases/compiler/thisInArrowFunctionInStaticInitializer1.ts] ////

//// [thisInArrowFunctionInStaticInitializer1.ts]
function log(a) { }

class Vector {
 static foo = () => {
  // 'this' should be allowed in a static initializer.
  log(this);
 }
}

//// [thisInArrowFunctionInStaticInitializer1.js]
function log(a) { }
let Vector = (() => {
    var _a;
    class Vector {
    }
    _a = Vector;
    Vector.foo = () => {
        // 'this' should be allowed in a static initializer.
        log(_a);
    };
    return Vector;
})();
