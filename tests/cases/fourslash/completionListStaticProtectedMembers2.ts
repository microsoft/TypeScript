/// <reference path='fourslash.ts'/>

////class Base {
////    private static privateMethod() { }
////    private static privateProperty;
////
////    protected static protectedMethod() { }
////    protected static protectedProperty;
////
////    public static publicMethod() { }
////    public static publicProperty;
////
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}
////
////class C2 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////
////    static test() {
////        Base./*1*/;
////        C2./*2*/;
////        this./*3*/;
////        super./*4*/;
////    }
////}

verify.completions(
    {
        // Same class, everything is visible
        marker: ["1"],
        exact: [
            "prototype",
            "protectedMethod",
            "protectedProperty",
            "publicMethod",
            "publicProperty",
            "protectedOverriddenMethod",
            "protectedOverriddenProperty",
            ...completion.functionMembers,
        ],
    },
    {
        marker: ["2", "3"],
        exact: [
            "prototype",
            "protectedOverriddenMethod",
            "protectedOverriddenProperty",
            "test",
            "protectedMethod",
            "protectedProperty",
            "publicMethod",
            "publicProperty",
            ...completion.functionMembers,
        ],
    },
    {
        // only public and protected methods of the base class are accessible through super
        marker: "4",
        exact: [
            "protectedMethod",
            "publicMethod",
            "protectedOverriddenMethod",
            "apply",
            "call",
            "bind",
            "toString",
        ],
    },
);
