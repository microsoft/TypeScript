/// <reference path='fourslash.ts'/>

////class Base {
////    private privateMethod() { }
////    private privateProperty;
////
////    protected protectedMethod() { }
////    protected protectedProperty;
////
////    public publicMethod() { }
////    public publicProperty;
////
////    protected protectedOverriddenMethod() { }
////    protected protectedOverriddenProperty;
////}
////
////class C1 extends Base {
////    protected  protectedOverriddenMethod() { }
////    protected  protectedOverriddenProperty;
////
////    test() {
////        this./*1*/;
////        super./*2*/;
////
////        var b: Base;
////        var c: C1;
////
////        b./*3*/;
////        c./*4*/;
////    }
////}

verify.completions(
    {
        // Same class, everything is visible
        marker: "1",
        includes: ["protectedMethod", "protectedProperty", "publicMethod", "publicProperty", "protectedOverriddenMethod", "protectedOverriddenProperty"],
        excludes: ["privateMethod", "privateProperty"],
    },
    {
        // Can not access properties on super
        marker: "2",
        includes: ["protectedMethod", "publicMethod", "protectedOverriddenMethod"],
        excludes: ["privateMethod", "privateProperty", "protectedProperty", "publicProperty", "protectedOverriddenProperty"],
    },
    {
        // Can not access protected properties through base class
        marker: "3",
        includes: ["publicMethod", "publicProperty"],
        excludes: ["privateMethod", "privateProperty", "protectedMethod", "protectedProperty", "protectedOverriddenMethod", "protectedOverriddenProperty"],
    },
    {
        // Same class, everything is visible
        marker: "4",
        includes: ["protectedMethod", "protectedProperty", "publicMethod", "publicProperty", "protectedOverriddenMethod", "protectedOverriddenProperty"],
        excludes: ["privateMethod", "privateProperty"],
    },
);
