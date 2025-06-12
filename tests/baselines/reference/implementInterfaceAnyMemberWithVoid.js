//// [tests/cases/compiler/implementInterfaceAnyMemberWithVoid.ts] ////

//// [implementInterfaceAnyMemberWithVoid.ts]
interface I {
    foo(value: number);
}

class Bug implements I {
    public foo(value: number) {
    }
}


//// [implementInterfaceAnyMemberWithVoid.js]
class Bug {
    foo(value) {
    }
}
