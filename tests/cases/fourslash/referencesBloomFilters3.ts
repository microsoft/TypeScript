/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file


// @Filename: declaration.ts
////enum Test { [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}42|]" = 1|] };

// @Filename: expression.ts
////(Test[[|42|]]);

verify.singleReferenceGroup('(enum member) Test["42"] = 1', "42");
