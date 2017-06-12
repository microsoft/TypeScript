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
var C5 = (function () {
    function C5() {
    }
    var proto_1 = C5.prototype;
    proto_1.iFn = function () { };
    return C5;
}());
