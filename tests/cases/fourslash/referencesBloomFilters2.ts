/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { /*1*/42 : 1 };

// @Filename: expression.ts
////function blah() { return (container[/*2*/42]) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container[/*3*/"42"] };

// @Filename: redeclaration.ts
////container = { /*4*/"42" : 18 };

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(4);
});