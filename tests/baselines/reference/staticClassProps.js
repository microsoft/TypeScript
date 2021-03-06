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
    (function () {
        C.z = 1;
    }).call(C);
    return C;
}());
