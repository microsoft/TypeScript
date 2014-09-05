/// <reference path='fourslash.ts'/>

// Ensure BloomFilter building logic is correct, by having one reference per file

// @Filename: declaration.ts
////var container = { /*1*/searchProp : 1 };

// @Filename: expression.ts
////function blah() { return (1 + 2 + container./*2*/searchProp()) === 2;  };

// @Filename: stringIndexer.ts
////function blah2() { container[/*3*/"searchProp"] };

// @Filename: redeclaration.ts
////container = { /*4*/"searchProp" : 18 };

test.markers().forEach(m => {
    goTo.position(m.position, m.fileName);
    verify.referencesCountIs(4);
});