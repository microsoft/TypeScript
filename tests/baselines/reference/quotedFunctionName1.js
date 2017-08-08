//// [quotedFunctionName1.ts]
class Test1 {
  "prop1"() { }
}

//// [quotedFunctionName1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Test1 = (function () {
    function Test1() {
    }
    Test1.prototype["prop1"] = function () { };
    __names(Test1.prototype, ["prop1"]);
    return Test1;
}());
