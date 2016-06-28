//// [quotedPropertyName1.ts]
class Test1 {
  "prop1" = 0;
}

//// [quotedPropertyName1.js]
var Test1 = (function () {
    function Test1() {
        this["prop1"] = 0;
    }
    return Test1;
}());
