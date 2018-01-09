//// [quotedFunctionName2.ts]
class Test1 {
  static "prop1"() { }
}

//// [quotedFunctionName2.js]
var Test1 = /** @class */ (function () {
    function Test1() {
    }
    Test1["prop1"] = function () { };
    return Test1;
}());
