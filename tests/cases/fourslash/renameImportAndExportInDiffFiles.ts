/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export var [|{| "isWriteAccess": true, "isDefinition": true |}a|];

// @Filename: b.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}a|] } from './a';
////export { [|{| "isWriteAccess": true, "isDefinition": true |}a|] };

verify.singleReferenceGroup("var a: any");
