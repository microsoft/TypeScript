/// <reference path='fourslash.ts'/>

////class A {
////    x: any
////    constructor([a]: any) {
////    }
////}
////class B {
////    x: any;
////    constructor( {a} = { a: 1 }) {
////    }
////}

verify.navigationBarCount(9); // global + 2 children + 2x(class + field + constructor)
