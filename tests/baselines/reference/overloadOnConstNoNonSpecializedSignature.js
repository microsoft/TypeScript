//// [tests/cases/compiler/overloadOnConstNoNonSpecializedSignature.ts] ////

//// [overloadOnConstNoNonSpecializedSignature.ts]
class C {
   x1(a: 'hi'); // error, no non-specialized signature in overload list
   x1(a: string) { }
}


//// [overloadOnConstNoNonSpecializedSignature.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.x1 = function (a) { };
    return C;
}());
