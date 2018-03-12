/// <reference path='fourslash.ts'/>

////export default class [|{| "isWriteAccess": true, "isDefinition": true |}DefaultExportedClass|] {
////}
////
////var x: [|DefaultExportedClass|];
////
////var y = new [|DefaultExportedClass|];

verify.singleReferenceGroup("class DefaultExportedClass");
