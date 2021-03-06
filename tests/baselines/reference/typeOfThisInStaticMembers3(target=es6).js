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
class C {
}
(function () {
    C.a = 1;
    C.b = this.a + 1;
}).call(C);
class D extends C {
}
(function () {
    D.c = 2;
    D.d = this.c + 1;
    D.e = super.a + this.c + 1;
}).call(D);
