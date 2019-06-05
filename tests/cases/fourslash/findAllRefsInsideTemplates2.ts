/// <reference path='fourslash.ts'/>

////[|function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}f|](...rest: any[]) { }|]
////[|f|] `${ [|f|] } ${ [|f|] }`

verify.singleReferenceGroup("function f(...rest: any[]): void", "f");
