//// [Protected3.ts]
class C {
  protected constructor() { }
}

//// [Protected3.js]
var C = (function () {
    function C() {
    }
    return C;
}());
