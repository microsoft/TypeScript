//// [asiAbstract.ts]
abstract
class NonAbstractClass {
  abstract s();
}

class C2 {
    abstract
    nonAbstractFunction() {
    }
}

class C3 {
    abstract
}


//// [asiAbstract.js]
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
abstract;
var NonAbstractClass = (function () {
    function NonAbstractClass() {
    }
    return NonAbstractClass;
}());
var C2 = (function () {
    function C2() {
    }
    C2.prototype.nonAbstractFunction = function () {
    };
    __names(C2.prototype, ["nonAbstractFunction"]);
    return C2;
}());
var C3 = (function () {
    function C3() {
    }
    return C3;
}());
