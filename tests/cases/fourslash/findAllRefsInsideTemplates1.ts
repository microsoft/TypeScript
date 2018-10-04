/// <reference path='fourslash.ts'/>

////var [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 10;
////var y = `${ [|x|] } ${ [|x|] }`

verify.singleReferenceGroup("var x: number");
