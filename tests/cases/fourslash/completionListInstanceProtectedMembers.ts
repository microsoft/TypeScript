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
////
////    test() {
////        this./*1*/;
////
////        var b: Base;
////        var c: C1;
////
////        b./*2*/;
////        c./*3*/;
////    }
////}
////
////class C1 extends Base {
////    protected  protectedOverriddenMethod() { }
////    protected  protectedOverriddenProperty;
////}

verify.completions(
    {
        marker: ["1", "2"],
        exact: ["privateMethod", "privateProperty", "protectedMethod", "protectedProperty", "publicMethod", "publicProperty", "protectedOverriddenMethod", "protectedOverriddenProperty", "test"],
    },
    {
        marker: "3",
        // Can not access protected properties overridden in subclass
        exact: ["privateMethod", "privateProperty", "protectedMethod", "protectedProperty", "publicMethod", "publicProperty", "test"],
    },
);
