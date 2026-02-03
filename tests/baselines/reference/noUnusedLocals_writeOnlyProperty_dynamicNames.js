//// [tests/cases/compiler/noUnusedLocals_writeOnlyProperty_dynamicNames.ts] ////

//// [noUnusedLocals_writeOnlyProperty_dynamicNames.ts]
const x = Symbol("x");
const y = Symbol("y");
class C {
    private [x]: number;
    private [y]: number;
    m() {
        this[x] = 0; // write-only
        this[y];
    }
}


//// [noUnusedLocals_writeOnlyProperty_dynamicNames.js]
var x = Symbol("x");
var y = Symbol("y");
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () {
        this[x] = 0; // write-only
        this[y];
    };
    return C;
}());
