//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers6.ts] ////

//// [typeOfThisInStaticMembers6.ts]
class C {
    static f = 1
}

class D extends C {
    static c = super();
}


//// [typeOfThisInStaticMembers6.js]
var _a, _b;
class C {
}
C.f = 1;
class D extends (_b = C) {
}
_a = D;
D.c = super();
