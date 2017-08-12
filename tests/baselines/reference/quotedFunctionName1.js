//// [quotedFunctionName1.ts]
class Test1 {
  "prop1"() { }
}

//// [quotedFunctionName1.js]
var Test1 = (function () {
    function Test1() {
    }
    var proto_1 = Test1.prototype;
    proto_1["prop1"] = function () { };
    return Test1;
}());
