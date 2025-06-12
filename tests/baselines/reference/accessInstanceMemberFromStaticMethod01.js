//// [tests/cases/compiler/accessInstanceMemberFromStaticMethod01.ts] ////

//// [accessInstanceMemberFromStaticMethod01.ts]
class C {
    static foo: string;

    bar() {
        let k = foo;
    }
}

//// [accessInstanceMemberFromStaticMethod01.js]
class C {
    bar() {
        let k = foo;
    }
}
