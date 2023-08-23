/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////function foo() {
////    [|"use strict";|]
////}

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
``,

        "/foo.ts":
`function foo() {
    "use strict";
}
`,
    },
});
