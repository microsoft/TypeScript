/// <reference path='fourslash.ts' />

// @module: esnext

// @Filename: /foo.ts
////export default function () {}

// @Filename: /a.ts
////"use strict";
////import foo from "./foo";
////[|function b() {
////    return foo;
////}|]
////b();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`"use strict";
import { b } from "./b";
b();`,

        "/b.ts":
`"use strict";
import foo from "./foo";

export function b() {
    return foo;
}
`,
    },
});
