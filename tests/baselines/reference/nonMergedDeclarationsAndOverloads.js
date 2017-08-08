//// [nonMergedDeclarationsAndOverloads.ts]
class A {
    m1: string;
    f() {}
    m1 (a: string): void;
    m1 (a: number): void;
    m1 (a: any): void {
    }
}

//// [nonMergedDeclarationsAndOverloads.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.f = function () { };
    A.prototype.m1 = function (a) {
    };
    __names(A.prototype, ["f", "m1"]);
    return A;
}());
