//// [noImplicitReturnInConstructors.ts]
class C {
  constructor() {
    return;
  }
}

//// [noImplicitReturnInConstructors.js]
var C = (function () {
    function C() {
        return;
    }
    return C;
}());
