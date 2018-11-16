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
////    public protectedOverriddenMethod() { }
////    public protectedOverriddenProperty;
////}
////
//// var c: C1;
//// c./*1*/

verify.completions({ marker: "1", exact: ["protectedOverriddenMethod", "protectedOverriddenProperty", "publicMethod", "publicProperty"] });
