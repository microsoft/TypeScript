/// <reference path='fourslash.ts' />

// @module: esnext

// @Filename: /foo.ts
////export default function () {}

// @Filename: /a.ts
////"use strict";
////"use foo";
////"use bar";
////import foo from "./foo";
////[|function b() {
////    return foo;
////}|]
////b();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`"use strict";
"use foo";
"use bar";
import { b } from "./b";
b();`,

        "/b.ts":
`"use strict";
"use foo";
"use bar";
import foo from "./foo";

export function b() {
    return foo;
}
`,
    },
});
