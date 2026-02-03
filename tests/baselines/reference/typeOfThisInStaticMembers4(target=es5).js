//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers4.ts] ////

//// [typeOfThisInStaticMembers4.ts]
class C {
    static a = 1;
    static b = this.a + 1;
}

class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
}


//// [typeOfThisInStaticMembers4.js]
let C = (() => {
    var _a;
    class C {
    }
    _a = C;
    Object.defineProperty(C, "a", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 1
    });
    Object.defineProperty(C, "b", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.a + 1
    });
    return C;
})();
let D = (() => {
    var _a;
    class D extends C {
    }
    _a = D;
    Object.defineProperty(D, "c", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 2
    });
    Object.defineProperty(D, "d", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: _a.c + 1
    });
    Object.defineProperty(D, "e", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: super.a + _a.c + 1
    });
    return D;
})();
