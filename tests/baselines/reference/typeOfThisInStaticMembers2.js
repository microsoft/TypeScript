//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers2.ts] ////

//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // ok
}

class C2<T> {
    static foo = this; // ok
}

//// [typeOfThisInStaticMembers2.js]
let C = (() => {
    var _a;
    class C {
    }
    _a = C;
    C.foo = _a; // ok
    return C;
})();
let C2 = (() => {
    var _a;
    class C2 {
    }
    _a = C2;
    C2.foo = _a; // ok
    return C2;
})();
