//// [augmentedTypesModules3.ts]
//// module then class
module m3 { }
class m3 { } // ok since the module is not instantiated

module m3a { var y = 2; }
class m3a { foo() { } } // error, class isn't ambient or declared before the module

//// [augmentedTypesModules3.js]
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
var m3 = (function () {
    function m3() {
    }
    return m3;
}()); // ok since the module is not instantiated
var m3a;
(function (m3a) {
    var y = 2;
})(m3a || (m3a = {}));
var m3a = (function () {
    function m3a() {
    }
    m3a.prototype.foo = function () { };
    __names(m3a.prototype, ["foo"]);
    return m3a;
}()); // error, class isn't ambient or declared before the module
