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
class C {
}
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
    value: C.a + 1
});
class D extends C {
}
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
    value: D.c + 1
});
Object.defineProperty(D, "e", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: C.a + D.c + 1
});
