/// <reference path="../fourslash.ts" />

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
////module Foo.Bar {
////  const sameName = () => new Foo.C();
////}

goTo.marker();
verify.baselineCallHierarchy();
