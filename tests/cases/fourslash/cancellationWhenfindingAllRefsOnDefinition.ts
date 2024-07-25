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

verify.baselineFindAllReferences("1");
cancellation.setCancelled();
verifyOperationIsCancelled(() => verify.baselineFindAllReferences('1'));

// verify that internal state is still correct
cancellation.resetCancelled();
verify.baselineFindAllReferences("1");
