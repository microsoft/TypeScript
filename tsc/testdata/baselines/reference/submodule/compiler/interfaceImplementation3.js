//// [tests/cases/compiler/interfaceImplementation3.ts] ////

//// [interfaceImplementation3.ts]
interface I1 {
    iObj:{ };
    iNum:number;
    iAny:any;
    iFn():void;
}

class C4 implements I1 {
    public iObj:{ };
    public iNum:number;
    public iFn() { }
}




//// [interfaceImplementation3.js]
class C4 {
    iObj;
    iNum;
    iFn() { }
}
