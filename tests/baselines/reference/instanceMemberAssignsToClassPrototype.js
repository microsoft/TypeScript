//// [instanceMemberAssignsToClassPrototype.ts]
class C {
    foo() {
        C.prototype.foo = () => { }
    }

    bar(x: number): number {
        C.prototype.bar = () => { } // error
        C.prototype.bar = (x) => x; // ok
        C.prototype.bar = (x: number) => 1; // ok
        return 1;
    }
}

//// [instanceMemberAssignsToClassPrototype.js]
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
var C = (function () {
    function C() {
    }
    C.prototype.foo = function () {
        C.prototype.foo = function () { };
    };
    C.prototype.bar = function (x) {
        C.prototype.bar = function () { }; // error
        C.prototype.bar = function (x) { return x; }; // ok
        C.prototype.bar = function (x) { return 1; }; // ok
        return 1;
    };
    __names(C.prototype, ["foo", "bar"]);
    return C;
}());
