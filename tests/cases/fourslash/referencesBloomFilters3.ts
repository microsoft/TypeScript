/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file


// @Filename: declaration.ts
////enum Test { /*1*/"42" = 1 };

// @Filename: expression.ts
////(Test[/*2*/42]);


test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(2);
});