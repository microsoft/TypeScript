//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock19.ts] ////

//// [classStaticBlock19.ts]
class C {
    @decorator
    static {
        // something
    }
}


//// [classStaticBlock19.js]
class C {
    static {
        // something
    }
}
