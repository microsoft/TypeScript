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
var Vector = /** @class */ (function () {
    function Vector() {
    }
    var _a;
    _a = Vector;
    Vector.foo = function () {
        // 'this' should be allowed in a static initializer.
        log(_a);
    };
    return Vector;
}());
