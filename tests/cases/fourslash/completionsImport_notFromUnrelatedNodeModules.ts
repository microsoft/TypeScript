/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /unrelated/node_modules/@types/foo/index.d.ts
////export function foo() {}

// @Filename: /src/b.ts
////fo/**/;

verify.completions({ marker: "", excludes: "foo", preferences: {  includeCompletionsForModuleExports: true } });
