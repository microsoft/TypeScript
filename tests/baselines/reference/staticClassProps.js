//// [tests/cases/compiler/staticClassProps.ts] ////

//// [staticClassProps.ts]
class C
{
    public foo() {
        static z = 1;
    }
}



//// [staticClassProps.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.foo = function () {
    };
    C.z = 1;
    return C;
}());
