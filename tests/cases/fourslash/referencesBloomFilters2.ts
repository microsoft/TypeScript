/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}42|]: 1|] };

// @Filename: expression.ts
////function blah() { return (container[[|42|]]) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container["[|42|]"] };

// @Filename: redeclaration.ts
////container = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 4 |}42|]" : 18|] };

verify.singleReferenceGroup("(property) 42: number", test.rangesByText().get("42"));
