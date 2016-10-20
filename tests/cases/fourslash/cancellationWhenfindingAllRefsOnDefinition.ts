/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition-import.ts
////export class Test{
////
////    constructor(){
////
////    }
////
////    public /**/[|start|](){
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
////second.[|start|]();
////second.stop();

verify.rangesReferenceEachOther();

cancellation.setCancelled();
verifyOperationIsCancelled(() => verify.rangesReferenceEachOther());

// verify that internal state is still correct
cancellation.resetCancelled();
verify.rangesReferenceEachOther();
