//// [tests/cases/compiler/accessStaticMemberFromInstanceMethod01.ts] ////

//// [accessStaticMemberFromInstanceMethod01.ts]
class C {
    foo: string;

    static bar() {
        let k = foo;
    }
}

//// [accessStaticMemberFromInstanceMethod01.js]
class C {
    foo;
    static bar() {
        let k = foo;
    }
}
