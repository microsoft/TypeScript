//// [tests/cases/conformance/classes/members/instanceAndStaticMembers/typeOfThisInStaticMembers2.ts] ////

//// [typeOfThisInStaticMembers2.ts]
class C {
    static foo = this; // ok
}

class C2<T> {
    static foo = this; // ok
}

//// [typeOfThisInStaticMembers2.js]
class C {
    static foo = this; // ok
}
class C2 {
    static foo = this; // ok
}
