/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////[|import foo from "./foo";|]

// No refactor available if every statement in the range is an import, since we don't move those.

verify.noMoveToNewFile();
