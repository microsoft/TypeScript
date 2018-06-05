/// <reference path='fourslash.ts'/>

// @Filename: /a.ts
////export const a = 0;

// @Filename: /b.ts
////import { a } from "[|/**/./a|]";

goTo.marker();
verify.renameInfoSucceeded(/*displayName*/ "/a.ts", /*fullDisplayName*/ "/a.ts", /*kind*/ "module", /*kindModifiers*/ "", /*fileToRename*/ "/a.ts");
