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
class Vector {
    static foo = () => {
        // 'this' should be allowed in a static initializer.
        log(this);
    };
}
