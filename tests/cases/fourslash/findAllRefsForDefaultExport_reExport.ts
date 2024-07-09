/// <reference path='fourslash.ts' />

// @Filename: /export.ts
////const /*0*/foo = 1;
////export default /*1*/foo;

// @Filename: /re-export.ts
////export { /*2*/default } from "./export";

// @Filename: /re-export-dep.ts
////import /*3*/fooDefault from "./re-export";

verify.baselineFindAllReferences('0', '1', '2', '3')
