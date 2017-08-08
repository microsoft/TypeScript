//// [argsInScope.ts]
class C {
    P(ii:number, j:number, k:number) {
       for (var i = 0; i < arguments.length; i++) {
           // WScript.Echo("param: " + arguments[i]);
       }
    }
}

var c = new C();
c.P(1,2,3);


//// [argsInScope.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.P = function (ii, j, k) {
        for (var i = 0; i < arguments.length; i++) {
            // WScript.Echo("param: " + arguments[i]);
        }
    };
    __names(C.prototype, ["P"]);
    return C;
}());
var c = new C();
c.P(1, 2, 3);
