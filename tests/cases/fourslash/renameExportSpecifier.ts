/// <reference path="fourslash.ts" />

// @Filename: a.ts
////const name = {};
////export { name as name/**/ };

// @Filename: b.ts
////import { name } from './a';
////const x = name.toString();

verify.baselineRename("", { providePrefixAndSuffixTextForRename: false });
