//// [typeParametersAndParametersInComputedNames.ts]
function foo<T>(a: T) : string {
    return "";
}

class A {
    [foo<T>(a)]<T>(a: T) {  
    }
}

//// [typeParametersAndParametersInComputedNames.js]
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
function foo(a) {
    return "";
}
var A = (function () {
    function A() {
    }
    A.prototype[_a = foo(a)] = function (a) {
    };
    __names(A.prototype, [_a]);
    return A;
    var _a;
}());
