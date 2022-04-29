/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*a*/export default function f() {}/*b*/

// @Filename: /b.ts
////import f from "./a";
////import { default as f } from "./a";
////import { default as g } from "./a";
////import f, * as a from "./a";
////
////export { default } from "./a";
////export { default as f } from "./a";
////export { default as i } from "./a";
////
////import * as a from "./a";
////a.default();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert default export to named export",
    actionDescription: "Convert default export to named export",
    newContent: {
        "/a.ts":
`export function f() {}`,

        "/b.ts":
`import { f } from "./a";
import { f } from "./a";
import { f as g } from "./a";
import * as a from "./a";
import { f } from "./a";

export { f as default } from "./a";
export { f } from "./a";
export { f as i } from "./a";

import * as a from "./a";
a.f();`,
},
});
