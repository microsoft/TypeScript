/// <reference path="../fourslash.ts"/>

////interface Fo/*1*/o {}
////class /*2*/Bar implements Foo {}

verify.baselineGoToImplementation('1');
