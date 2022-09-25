/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition-import.ts
////export class Test{
////
////    constructor(){
////
////    }
////
////    public /*1*/start(){
////        return this;
////    }
////
////    public stop(){
////        return this;
////    }
////}

//@Filename: findAllRefsOnDefinition.ts
////import Second = require("./findAllRefsOnDefinition-import");
////
////var second = new Second.Test()
////second./*2*/start();
////second.stop();

let count = 1;

checkRefs();

cancellation.setCancelled();
verifyOperationIsCancelled(checkRefs);

// verify that internal state is still correct
cancellation.resetCancelled();
checkRefs();

function checkRefs() {
    verify.baselineFindAllReferencesMulti(count++, '1');
}
