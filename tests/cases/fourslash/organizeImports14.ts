/// <reference path="fourslash.ts" />

// @filename: /a.ts
////export const foo = 1;

// @filename: /b.ts
/////**
//// * Module doc comment
//// *
//// * @module
//// */
////
////// comment 1
////
////// comment 2
////
////import { foo } from "./a";
////import { foo } from "./a";
////import { foo } from "./a";

goTo.file("/b.ts");
verify.organizeImports(
`/**
 * Module doc comment
 *
 * @module
 */

// comment 1

// comment 2

`);
