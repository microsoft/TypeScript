//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers2.ts] ////

//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // ok
}

class C2<T> {
    static foo = this; // ok
}

//// [typeOfThisInStaticMembers2.js]
var _a, _b;
class C {
}
_a = C;
C.foo = _a; // ok
class C2 {
}
_b = C2;
C2.foo = _b; // ok
