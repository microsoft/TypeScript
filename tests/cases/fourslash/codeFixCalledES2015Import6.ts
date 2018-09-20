/// <reference path='fourslash.ts' />
// @esModuleInterop: true
// @module: amd
// @Filename: foo.d.ts
////declare function foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////[|import * as foo from "./foo";|]
////foo();

goTo.file(1);
verify.codeFix({
    description: `Replace import with 'import foo from "./foo";'.`,
    newRangeContent: `import foo from "./foo";`,
    index: 0,
});
