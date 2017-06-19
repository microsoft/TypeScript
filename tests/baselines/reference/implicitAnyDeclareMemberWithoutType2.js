//// [implicitAnyDeclareMemberWithoutType2.ts]
// this should be an error
class C {
    public x = null;// error at "x"
    public x1: string  // no error

    constructor(c1, c2, c3: string) { }  // error at "c1, c2"
    funcOfC(f1, f2, f3: number) { }     // error at "f1,f2"
}


//// [implicitAnyDeclareMemberWithoutType2.js]
// this should be an error
var C = /** @class */ (function () {
    function C(c1, c2, c3) {
        this.x = null; // error at "x"
    } // error at "c1, c2"
    C.prototype.funcOfC = function (f1, f2, f3) { }; // error at "f1,f2"
    return C;
}());
