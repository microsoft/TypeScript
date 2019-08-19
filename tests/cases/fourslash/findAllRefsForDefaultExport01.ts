/// <reference path='fourslash.ts'/>

////[|export default class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}DefaultExportedClass|] {
////}|]
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

verify.singleReferenceGroup("class DefaultExportedClass", "DefaultExportedClass");
