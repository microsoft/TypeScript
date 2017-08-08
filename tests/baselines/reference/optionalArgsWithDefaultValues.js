//// [optionalArgsWithDefaultValues.ts]
function foo(x: number, y?:boolean=false, z?=0) {}

class CCC {
    public foo(x: number, y?:boolean=false, z?=0) {}
    static foo2(x: number, y?:boolean=false, z?=0) {}
}

var a = (x?=0) => { return 1; };
var b = (x, y?:number = 2) => { x; };

//// [optionalArgsWithDefaultValues.js]
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
function foo(x, y, z) {
    if (y === void 0) { y = false; }
    if (z === void 0) { z = 0; }
}
var CCC = (function () {
    function CCC() {
    }
    CCC.prototype.foo = function (x, y, z) {
        if (y === void 0) { y = false; }
        if (z === void 0) { z = 0; }
    };
    CCC.foo2 = function (x, y, z) {
        if (y === void 0) { y = false; }
        if (z === void 0) { z = 0; }
    };
    __names(CCC.prototype, ["foo"]);
    return CCC;
}());
var a = function (x) {
    if (x === void 0) { x = 0; }
    return 1;
};
var b = function (x, y) {
    if (y === void 0) { y = 2; }
    x;
};
