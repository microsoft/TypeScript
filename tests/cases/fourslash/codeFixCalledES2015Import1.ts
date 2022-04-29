/// <reference path='fourslash.ts' />
// @esModuleInterop: true
// @Filename: foo.d.ts
////declare function foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////import * as foo from "./foo";
////function invoke(f: () => void) { f(); }
////invoke([|foo|]);

goTo.file(1);
verify.codeFix({
    description: `Replace import with 'import foo = require("./foo");'.`,
    newFileContent: `import foo = require("./foo");
function invoke(f: () => void) { f(); }
invoke(foo);`,
    index: 1,
});
