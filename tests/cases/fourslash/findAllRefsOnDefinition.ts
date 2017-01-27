/// <reference path="fourslash.ts" />

//@Filename: findAllRefsOnDefinition-import.ts
////export class Test{
////
////    constructor(){
////
////    }
////
////    public [|{| "isWriteAccess": true, "isDefinition": true |}start|](){
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

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(r0, [{ definition: "(method) Test.start(): this", ranges }]);
verify.referenceGroups(r1, [
    { definition: "(method) Second.Test.start(): Second.Test", ranges: [r0] },
    { definition: "(method) Second.Test.start(): Second.Test", ranges: [r1] },
]);
