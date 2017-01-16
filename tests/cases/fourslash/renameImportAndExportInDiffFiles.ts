/// <reference path='fourslash.ts' />

// @Filename: a.ts
////export var [|a|];

// @Filename: b.ts
////import { [|a|] } from './a';
////export { [|a|] };

verify.rangesReferenceEachOther();
