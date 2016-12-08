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


// Same class, everything is visible
goTo.marker("1");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');

// Can not access properties on super
goTo.marker("2");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.not.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');

// Can not access protected properties through base class
goTo.marker("3");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.not.completionListContains('protectedMethod');
verify.not.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.not.completionListContains('protectedOverriddenMethod');
verify.not.completionListContains('protectedOverriddenProperty');

// Same class, everything is visible
goTo.marker("4");
verify.not.completionListContains('privateMethod');
verify.not.completionListContains('privateProperty');
verify.completionListContains('protectedMethod');
verify.completionListContains('protectedProperty');
verify.completionListContains('publicMethod');
verify.completionListContains('publicProperty');
verify.completionListContains('protectedOverriddenMethod');
verify.completionListContains('protectedOverriddenProperty');
