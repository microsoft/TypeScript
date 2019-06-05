/// <reference path='fourslash.ts'/>

////[|export default class [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}DefaultExportedClass|] {
////}|]
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

verify.singleReferenceGroup("class DefaultExportedClass", "DefaultExportedClass");
