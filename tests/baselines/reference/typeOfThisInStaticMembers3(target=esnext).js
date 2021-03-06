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
C.a = 1;
C.b = C.a + 1;
class D extends C {
}
D.c = 2;
D.d = D.c + 1;
D.e = super.a + D.c + 1;
