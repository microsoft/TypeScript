/// <reference path='fourslash.ts'/>

////function [|{| "isWriteAccess": true, "isDefinition": true |}f|](...rest: any[]) { }
////[|f|] `${ [|f|] } ${ [|f|] }`

verify.singleReferenceGroup("function f(...rest: any[]): void");
