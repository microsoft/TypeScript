//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers7.ts] ////

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
let C = (() => {
    var _a;
    class C {
    }
    _a = C;
    C.a = 1;
    C.b = _a.a + 1;
    return C;
})();
let D = (() => {
    var _a;
    class D extends C {
    }
    _a = D;
    D.c = 2;
    D.d = _a.c + 1;
    D.e = 1 + (super.a) + (_a.c + 1) + 1;
    return D;
})();
