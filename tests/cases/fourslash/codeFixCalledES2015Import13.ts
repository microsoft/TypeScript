/// <reference path='fourslash.ts' />
// @esModuleInterop: true
// @Filename: foo.d.ts
////declare function foo(): void;
////declare namespace foo {}
////export = foo;

// @Filename: index.ts
////import * as Foo from "./foo";
////[|new Foo()|];

goTo.file(1);
verify.codeFix({
    description: `Use synthetic 'default' member.`,
    newFileContent: `import * as Foo from "./foo";
new Foo.default();`,
    index: 2,
});
