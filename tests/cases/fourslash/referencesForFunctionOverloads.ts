/// <reference path='fourslash.ts'/>

// Function overloads should be highlighted together.

////[|function [|{| "isDefinition": true, "contextRangeIndex": 0 |}foo|](x: string);|]
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}foo|](x: string, y: number) {
////    [|foo|]('', 43);
////}|]

verify.singleReferenceGroup("function foo(x: string): any", "foo");
