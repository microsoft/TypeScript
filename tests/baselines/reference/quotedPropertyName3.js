//// [quotedPropertyName3.ts]
class Test {
    "prop1": number;
    foo() {
        var x = () => this["prop1"];
        var y: number = x();
    }
}

//// [quotedPropertyName3.js]
var Test = (function () {
    function Test() {
    }
    Test.prototype.foo = function () {
        var _this = this;
        var x = function () { return _this["prop1"]; };
        var y = x();
    };
    return Test;
}());
