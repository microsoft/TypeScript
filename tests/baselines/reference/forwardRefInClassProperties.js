//// [forwardRefInClassProperties.ts]
class Test
{
    _b = this._a; // undefined, no error/warning
    _a = 3;

    static _B = Test._A; // undefined, no error/warning
    static _A = 3;

    method()
    {
        let a = b; // Block-scoped variable 'b' used before its declaration
        let b = 3;
    }
}


//// [forwardRefInClassProperties.js]
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
var Test = (function () {
    function Test() {
        this._b = this._a; // undefined, no error/warning
        this._a = 3;
    }
    Test.prototype.method = function () {
        var a = b; // Block-scoped variable 'b' used before its declaration
        var b = 3;
    };
    __names(Test.prototype, ["method"]);
    Test._B = Test._A; // undefined, no error/warning
    Test._A = 3;
    return Test;
}());
