//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlockUseBeforeDef4.ts] ////

//// [classStaticBlockUseBeforeDef4.ts]
class C {
    static accessor x;
    static {
        this.x = 1;
    }
    static accessor y = this.x;
    static accessor z;
    static {
        this.z = this.y;
    }
}


//// [classStaticBlockUseBeforeDef4.js]
class C {
    static accessor x;
    static {
        this.x = 1;
    }
    static accessor y = this.x;
    static accessor z;
    static {
        this.z = this.y;
    }
}


//// [classStaticBlockUseBeforeDef4.d.ts]
declare class C {
    static accessor x: any;
    static accessor y: any;
    static accessor z: any;
}
