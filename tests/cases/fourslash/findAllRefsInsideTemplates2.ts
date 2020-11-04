/// <reference path='fourslash.ts'/>

////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|](...rest: any[]) { }|]
////[|f|] `${ [|f|] } ${ [|f|] }`

verify.singleReferenceGroup("function f(...rest: any[]): void", "f");
