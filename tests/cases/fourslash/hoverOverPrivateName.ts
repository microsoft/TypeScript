/// <reference path="fourslash.ts" />

////class A {
////    #foo: number;
////
////    constructor () {
////        this./**/#foo = 3;
////    }
////
////}

goTo.marker();
verify.quickInfoIs("");
verify.goToDefinitionIs([]);
verify.noReferences();