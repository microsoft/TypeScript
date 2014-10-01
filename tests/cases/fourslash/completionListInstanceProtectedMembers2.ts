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
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');

// Can not access properties on super
goTo.marker("2");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.not.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');

// Can not access protected properties through base class
goTo.marker("3");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.not.memberListContains('protectedMethod');
verify.not.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.not.memberListContains('protectedOverriddenMethod');
verify.not.memberListContains('protectedOverriddenProperty');

// Same class, everything is visible
goTo.marker("4");
verify.not.memberListContains('privateMethod');
verify.not.memberListContains('privateProperty');
verify.memberListContains('protectedMethod');
verify.memberListContains('protectedProperty');
verify.memberListContains('publicMethod');
verify.memberListContains('publicProperty');
verify.memberListContains('protectedOverriddenMethod');
verify.memberListContains('protectedOverriddenProperty');
