/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////"use strict";
////[|function b() {
////    return this;
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
export function b() {
    return this;
}
`,
    },
});
