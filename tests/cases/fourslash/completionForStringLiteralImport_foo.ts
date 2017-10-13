/// <reference path='fourslash.ts' />

// @moduleResolution: node

// @Filename: /node_modules/a/b/a.d.ts
////export const x = 0;

// @Filename: /node_modules/a/b/b.d.ts
////export const x = 0;

// @Filename: /node_modules/red_herring/index.d.ts
////export const x = 0;

// @Filename: /a.ts
////import {} from "/**/";

goTo.marker();
console.log(">>>");
debug.printCompletionListMembers();
console.log("<<<");
//verify.completionListContains("someFile.ts", undefined, undefined, undefined, 0);
