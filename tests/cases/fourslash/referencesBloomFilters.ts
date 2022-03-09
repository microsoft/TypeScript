/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { /*1*/searchProp : 1 };

// @Filename: expression.ts
////function blah() { return (1 + 2 + container.searchProp()) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container["searchProp"] };

// @Filename: redeclaration.ts
////container = { "searchProp" : 18 };

verify.baselineFindAllReferences('1')
