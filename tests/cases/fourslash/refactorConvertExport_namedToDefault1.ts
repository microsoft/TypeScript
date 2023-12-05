/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////*a*/export function f() {}/*b*/

// @Filename: /b.ts
////import { f } from "./a";
////import { f as g } from "./a";
////import { f, other } from "./a";
////
////export { f } from "./a";
////export { f as i } from "./a";
////export { f as default } from "./a";
////
////import * as a from "./a";
////a.f();

goTo.select("a", "b");
edit.applyRefactor({
    refactorName: "Convert export",
    actionName: "Convert named export to default export",
    actionDescription: "Convert named export to default export",
    newContent: {
        "/a.ts":
`export default function f() {}`,

        "/b.ts":
`import f from "./a";
import g from "./a";
import f, { other } from "./a";

export { default as f } from "./a";
export { default as i } from "./a";
export { default } from "./a";

import * as a from "./a";
a.default();`,
},
});
