/// <reference path='fourslash.ts'/>

////[|var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|] = 10;|]
////var y = `${ [|x|] } ${ [|x|] }`

verify.singleReferenceGroup("var x: number", "x");
