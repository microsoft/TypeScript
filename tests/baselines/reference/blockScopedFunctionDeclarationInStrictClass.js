//// [blockScopedFunctionDeclarationInStrictClass.ts]
class c {
    method() {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    }
}

//// [blockScopedFunctionDeclarationInStrictClass.js]
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
var c = (function () {
    function c() {
    }
    c.prototype.method = function () {
        if (true) {
            function foo() { }
            foo(); // ok
        }
        foo(); // not ok
    };
    __names(c.prototype, ["method"]);
    return c;
}());
