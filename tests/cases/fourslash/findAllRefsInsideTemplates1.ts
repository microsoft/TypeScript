/// <reference path='fourslash.ts'/>

////[|var [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}x|] = 10;|]
////var y = `${ [|x|] } ${ [|x|] }`

verify.singleReferenceGroup("var x: number", "x");
