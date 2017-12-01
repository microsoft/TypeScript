//// [interfaceImplementation4.ts]
interface I1 {
    iObj:{ };
    iNum:number;
    iAny:any;
    iFn():void;
}

class C5 implements I1 {
    public iNum:number;
    public iAny:any;
    public iFn() { }
}


//// [interfaceImplementation4.js]
var C5 = /** @class */ (function () {
    function C5() {
    }
    C5.prototype.iFn = function () { };
    return C5;
}());
