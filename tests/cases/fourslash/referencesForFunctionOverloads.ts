/// <reference path='fourslash.ts'/>

// Function overloads should be highlighted together.

////function [|{| "isDefinition": true |}foo|](x: string);
////function [|{| "isWriteAccess": true, "isDefinition": true |}foo|](x: string, y: number) {
////    [|foo|]('', 43);
////}

verify.singleReferenceGroup("function foo(x: string): any");
