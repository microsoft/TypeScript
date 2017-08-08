//// [interfaceImplementation7.ts]
interface i1{ name(): { s: string; }; }
interface i2{ name(): { n: number; }; }

interface i3 extends i1, i2 { }
interface i4 extends i1, i2 { name(): { s: string; n: number; }; }

class C1 implements i4 {
    public name(): string { return ""; }
}


//// [interfaceImplementation7.js]
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
var C1 = (function () {
    function C1() {
    }
    C1.prototype.name = function () { return ""; };
    __names(C1.prototype, ["name"]);
    return C1;
}());
