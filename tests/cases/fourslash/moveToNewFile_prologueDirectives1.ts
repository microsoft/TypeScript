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
b();`,

        "/b.ts":
`"use strict";
function b() {
    return this;
}
`,
    },
});
