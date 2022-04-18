/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file


// @Filename: declaration.ts
////enum Test { /*1*/"/*2*/42" = 1 };

// @Filename: expression.ts
////(Test[/*3*/42]);

verify.baselineFindAllReferences('1', '2', '3');
