//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock20.ts] ////

//// [classStaticBlock20.ts]
class C {
    async static {
        // something
    }

    public static {
        // something
    }

    readonly private static {
        // something
    }
}


//// [classStaticBlock20.js]
class C {
    static {
        // something
    }
    static {
        // something
    }
    static {
        // something
    }
}
