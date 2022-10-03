/// <reference path='fourslash.ts' />
// @esModuleInterop: true
// @Filename: foo.d.ts
////declare class foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////[|import * as foo from "./foo";|]
////new foo();

goTo.file(1);
verify.codeFix({
    description: `Replace import with 'import foo = require("./foo");'.`,
    newRangeContent: `import foo = require("./foo");`,
    index: 1,
});
