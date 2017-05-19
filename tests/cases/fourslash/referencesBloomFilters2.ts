/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { [|{| "isDefinition": true |}42|]: 1 };

// @Filename: expression.ts
////function blah() { return (container[[|42|]]) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container["[|42|]"] };

// @Filename: redeclaration.ts
////container = { "[|{| "isDefinition": true |}42|]" : 18 };

const ranges = test.ranges();
const [r0, r1, r2, r3] = ranges;
verify.referenceGroups(r0, [{ definition: "(property) 42: number", ranges }]);
verify.referenceGroups([r1, r2], [
    { definition: "(property) 42: number", ranges: [r0, r3] },
    { definition: "(property) 42: number", ranges: [r1, r2] }
]);
verify.referenceGroups(r3, [
    { definition: "(property) 42: number", ranges: [r0, r1, r2] },
    { definition: '(property) "42": number', ranges: [r3] }
]);
