//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers6.ts] ////

//// [typeOfThisInStaticMembers6.ts]
class C {
    static f = 1
}

class D extends C {
    static c = super();
}


//// [typeOfThisInStaticMembers6.js]
let C = (() => {
    class C {
    }
    C.f = 1;
    return C;
})();
let D = (() => {
    class D extends C {
    }
    D.c = super();
    return D;
})();
