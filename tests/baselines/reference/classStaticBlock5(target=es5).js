//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock5.ts] ////

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
let B = (() => {
    class B {
    }
    B.a = 1;
    B.b = 2;
    return B;
})();
let C = (() => {
    var _a;
    class C extends B {
    }
    _a = C;
    C.b = 3;
    C.c = super.a;
    (() => {
        _a.b;
        super.b;
        super.a;
    })();
    return C;
})();
