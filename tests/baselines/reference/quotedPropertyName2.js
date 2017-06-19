//// [quotedPropertyName2.ts]
class Test1 {
  static "prop1" = 0;
}

//// [quotedPropertyName2.js]
var Test1 = /** @class */ (function () {
    function Test1() {
    }
    Test1["prop1"] = 0;
    return Test1;
}());
