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


// Same class, everything is visible
goTo.marker("1");
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

goTo.marker("2");
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

// Can not access protected properties overridden in subclass
goTo.marker("3");
verify.completionListContains('privateMethod');
verify.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.not.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');
