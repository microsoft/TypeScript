/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////class C {
////    get g() { return 0; }
////    get h() { return 1; }
////}
////[|export const { g, h: i } = new C();|]

// @Filename: /b.ts
////import { g, i } from "./a";

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export class C {
    get g() { return 0; }
    get h() { return 1; }
}
`,

        "/g.ts":
`import { C } from "./a";
export const { g, h: i } = new C();
`,

        "/b.ts":
`
import { g, i } from "./g";
`,
    },
});
