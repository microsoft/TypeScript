/// <reference path='fourslash.ts' />
// @esModuleInterop: true
// @Filename: foo.d.ts
////declare function foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////// Comment
////import * as foo from "./foo";
////[|foo()|];

goTo.file(1);
verify.codeFix({
    description: `Replace import with 'import foo from "./foo";'.`,
    newFileContent: `// Comment
import foo from "./foo";
foo();`,
    index: 0,
});
