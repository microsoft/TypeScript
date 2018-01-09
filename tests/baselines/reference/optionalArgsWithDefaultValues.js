//// [optionalArgsWithDefaultValues.ts]
function foo(x: number, y?:boolean=false, z?=0) {}

class CCC {
    public foo(x: number, y?:boolean=false, z?=0) {}
    static foo2(x: number, y?:boolean=false, z?=0) {}
}

var a = (x?=0) => { return 1; };
var b = (x, y?:number = 2) => { x; };

//// [optionalArgsWithDefaultValues.js]
function foo(x, y, z) {
    if (y === void 0) { y = false; }
    if (z === void 0) { z = 0; }
}
var CCC = /** @class */ (function () {
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
