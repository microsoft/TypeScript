//// [quotedFunctionName1.ts]
class Test1 {
  "prop1"() { }
}

//// [quotedFunctionName1.js]
var Test1 = /** @class */ (function () {
    function Test1() {
    }
    Test1.prototype["prop1"] = function () { };
    return Test1;
}());
