//// [tests/cases/compiler/interfaceImplementation4.ts] ////

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
class C5 {
    iNum;
    iAny;
    iFn() { }
}
