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
var _a, _b;
class B {
}
B.a = 1;
B.b = 2;
class C extends (_b = B) {
}
_a = C;
C.b = 3;
C.c = Reflect.get(_b, "a", _a);
(() => {
    _a.b;
    Reflect.get(_b, "b", _a);
    Reflect.get(_b, "a", _a);
})();
