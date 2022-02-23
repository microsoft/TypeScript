//// [typeOfThisInStaticMembers7.ts]
class C {
    static a = 1;
    static b = this.a + 1;
}

class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = 1 + (super.a) + (this.c + 1) + 1;
}


//// [typeOfThisInStaticMembers7.js]
var _a, _b, _c;
class C {
}
_a = C;
C.a = 1;
C.b = _a.a + 1;
class D extends (_c = C) {
}
_b = D;
D.c = 2;
D.d = _b.c + 1;
D.e = 1 + (Reflect.get(_c, "a", _b)) + (_b.c + 1) + 1;
