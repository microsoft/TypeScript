//// [tests/cases/compiler/quotedPropertyName1.ts] ////

//// [quotedPropertyName1.ts]
class Test1 {
  "prop1" = 0;
}

//// [quotedPropertyName1.js]
var Test1 = /** @class */ (function () {
    function Test1() {
        this["prop1"] = 0;
    }
    return Test1;
}());
