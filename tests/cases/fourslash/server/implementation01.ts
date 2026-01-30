/// <reference path="../fourslash.ts"/>

// @lib: es5

////interface Fo/*1*/o {}
////class /*2*/Bar implements Foo {}

verify.baselineGoToImplementation('1');
