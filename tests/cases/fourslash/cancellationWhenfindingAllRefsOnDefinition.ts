/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition-import.ts
////export class Test{
////
////    constructor(){
////
////    }
////
////    public /**/[|{| "isWriteAccess": true, "isDefinition": true |}start|](){
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

checkRefs();

cancellation.setCancelled();
verifyOperationIsCancelled(checkRefs);

// verify that internal state is still correct
cancellation.resetCancelled();
checkRefs();

function checkRefs() {
    verify.singleReferenceGroup("(method) Test.start(): this");
}
