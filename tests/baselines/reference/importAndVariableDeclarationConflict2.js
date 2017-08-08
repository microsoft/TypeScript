//// [importAndVariableDeclarationConflict2.ts]
module m {
  export var m = '';
}

import x = m.m;

class C {
  public foo() {
    var x = '';
  }
}

//// [importAndVariableDeclarationConflict2.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
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
var m;
(function (m_1) {
    m_1.m = '';
})(m || (m = {}));
var x = m.m;
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        var x = '';
    };
    __names(C.prototype, ["foo"]);
    return C;
}());
