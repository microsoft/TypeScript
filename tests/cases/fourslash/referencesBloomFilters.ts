/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { [|{| "isWriteAccess": true, "isDefinition": true |}searchProp|] : 1 };

// @Filename: expression.ts
////function blah() { return (1 + 2 + container.[|searchProp|]()) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container["[|searchProp|]"] };

// @Filename: redeclaration.ts
////container = { "[|{| "isWriteAccess": true, "isDefinition": true |}searchProp|]" : 18 };

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) searchProp: number", ranges }]);
verify.referenceGroups([r1, r2], [
    { definition: "(property) searchProp: number", ranges: [r0, r3] },
    { definition: "(property) searchProp: number", ranges: [r1, r2] }
]);
verify.referenceGroups(r3, [
    { definition: "(property) searchProp: number", ranges: [r0, r1, r2] },
    { definition: '(property) "searchProp": number', ranges: [r3] }
]);
