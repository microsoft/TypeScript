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
////
////    static test() {
////        Base./*1*/;
////        this./*2*/;
////        C1./*3*/;
////    }
////}
////
////class C1 extends Base {
////    protected static protectedOverriddenMethod() { }
////    protected static protectedOverriddenProperty;
////}

verify.completions(
    {
        marker: ["1", "2"],
        // Same class, everything is visible
        includes: ["privateMethod", "privateProperty", "protectedMethod", "protectedProperty", "publicMethod", "publicProperty", "protectedOverriddenMethod", "protectedOverriddenProperty"],
    },
    {
        marker: "3",
        includes: ["privateMethod", "privateProperty", "protectedMethod", "protectedProperty", "publicMethod", "publicProperty"],
        // Can not access protected properties overridden in subclass
        excludes: ["protectedOverriddenMethod", "protectedOverriddenProperty"],
    },
);
