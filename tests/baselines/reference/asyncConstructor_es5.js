//// [asyncConstructor_es5.ts]
class C {
  async constructor() {
  }
}

//// [asyncConstructor_es5.js]
var C = (function () {
    function C() {
    }
    return C;
}());
