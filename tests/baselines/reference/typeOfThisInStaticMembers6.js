//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers6.ts] ////

//// [typeOfThisInStaticMembers6.ts]
class C {
    static f = 1
}

class D extends C {
    static c = super();
}


//// [typeOfThisInStaticMembers6.js]
class C {
    static f = 1;
}
class D extends C {
    static c = super();
}
