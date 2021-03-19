//// [classStaticBlock5.ts]
class B {
    static a = 1;
    static b = 2;
}

class C extends B {
    static b = 3;
    static c = super.a

    static {
        this.b;
        super.b;
        super.a;
    }
}


//// [classStaticBlock5.js]
var _C__;
class B {
}
B.a = 1;
B.b = 2;
class C extends B {
}
C.b = 3;
C.c = super.a;
_C__ = { value: (() => {
        this.b;
        super.b;
        super.a;
    })() };
