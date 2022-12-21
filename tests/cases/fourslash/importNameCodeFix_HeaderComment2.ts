/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////export const bar = 0;

// @Filename: /c.ts
/////*--------------------
//// *  Copyright Header
//// *--------------------*/
////
////const afterHeader = 1;
////
////// non-header comment
////import { bar } from "./b";
////foo;

goTo.file("/c.ts");
verify.importFixAtPosition([
`/*--------------------
 *  Copyright Header
 *--------------------*/

const afterHeader = 1;

import { foo } from "./a";
// non-header comment
import { bar } from "./b";
foo;`,
]);
