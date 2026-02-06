/// <reference path="../fourslash.ts" />

// @lib: es5

////function /**/f() {}
////
////class A {
////  static sameName() {
////    f();
////  }
////}
////
////class B {
////  sameName() {
////    A.sameName();
////  }
////}
////
////const Obj = {
////  get sameName() {
////    return new B().sameName;
////  }
////};
////
////namespace Foo {
////  function sameName() {
////    return Obj.sameName;
////  }
////
////  export class C {
////    constructor() {
////      sameName();
////    }
////  }
////}
////
////namespace Foo.Bar {
////  const sameName = () => new Foo.C();
////}

goTo.marker();
verify.baselineCallHierarchy();
