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

verify.getScriptLexicalStructureListCount(6); // 2x(class + field + constructor)
