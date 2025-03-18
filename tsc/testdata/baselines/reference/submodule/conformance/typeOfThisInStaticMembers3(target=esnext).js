//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers3.ts] ////

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
    static a = 1;
    static b = this.a + 1;
}
class D extends C {
    static c = 2;
    static d = this.c + 1;
    static e = super.a + this.c + 1;
}
