/// <reference path='fourslash.ts' />

// @Filename: foo.d.ts
////declare function foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////[|import * as foo from "./foo";|]
////foo();

goTo.file(1);
verify.codeFix({
    description: `Convert to default import`,
    newRangeContent: `import foo from "./foo";`,
    index: 0,
});
