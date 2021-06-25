//// [typeOfThisInStaticMembers3.ts]
class C {
    static a = 1;
    static b = this.a + 1;
}

class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
}


//// [typeOfThisInStaticMembers3.js]
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
D.e = Reflect.get(_c, "a", _b) + _b.c + 1;
