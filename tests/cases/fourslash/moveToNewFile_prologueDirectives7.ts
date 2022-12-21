/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////"use strict";
////[|function b() {
////    return this;
////}|]
////"prologue directive like statement";
////b();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`"use strict";
"prologue directive like statement";
b();`,

        "/b.ts":
`"use strict";
function b() {
    return this;
}
`,
    },
});
