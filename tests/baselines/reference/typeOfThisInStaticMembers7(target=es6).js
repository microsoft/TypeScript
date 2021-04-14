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
class C {
}
C.a = 1;
C.b = this.a + 1;
class D extends C {
}
D.c = 2;
D.d = this.c + 1;
D.e = 1 + (super.a) + (this.c + 1) + 1;
