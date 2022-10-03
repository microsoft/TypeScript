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
////}
////
//// var b: Base;
//// var c: C1;
//// b./*1*/;
//// c./*2*/;

// Only public properties are visible outside the class
verify.completions({ marker: ["1", "2"], exact: ["publicMethod", "publicProperty"] });
