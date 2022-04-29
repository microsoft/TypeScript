//// [augmentedTypesModules3.ts]
//// module then class
module m3 { }
class m3 { } // ok since the module is not instantiated

module m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module

//// [augmentedTypesModules3.js]
var m3 = /** @class */ (function () {
    function m3() {
    }
    return m3;
}()); // ok since the module is not instantiated
var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
var m3a = /** @class */ (function () {
    function m3a() {
    }
    m3a.prototype.foo = function () { };
    return m3a;
}()); // error, class isn't ambient or declared before the module
