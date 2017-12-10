/// <reference path="fourslash.ts" />

// @Filename: /unrelated/node_modules/@types/foo/index.d.ts
////export function foo() {}

// @Filename: /src/b.ts
////fo/**/;

goTo.marker("");
verify.not.completionListContains({ name: "foo", source: "/unrelated/node_modules/@types/foo/index" }, undefined, undefined, undefined, undefined, undefined, { includeExternalModuleExports: true });
