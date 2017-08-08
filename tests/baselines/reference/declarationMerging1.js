//// [tests/cases/compiler/declarationMerging1.ts] ////

//// [file1.ts]
class A {
    protected _f: number;
    getF() { return this._f; }
}

//// [file2.ts]
interface A {
    run();
}

//// [file1.js]
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
    A.prototype.getF = function () { return this._f; };
    __names(A.prototype, ["getF"]);
    return A;
}());
//// [file2.js]
