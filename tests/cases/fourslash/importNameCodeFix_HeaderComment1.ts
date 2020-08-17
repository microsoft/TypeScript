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
////import { bar } from "./b";
////foo;

goTo.file("/c.ts");
verify.importFixAtPosition([
`/*--------------------
 *  Copyright Header
 *--------------------*/

import { foo } from "./a";
import { bar } from "./b";
foo;`,
]);
