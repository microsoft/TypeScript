/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export const x = 0;
////[|export const y = 0;|]

// @Filename: /user.ts
////import { x, y } from "./a";
////import { x as x2 } from "./a";
////import {} from "./a";

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`export const x = 0;
`,

        "/y.ts":
`export const y = 0;
`,

        "/user.ts":
`import { x } from "./a";
import { y } from "./y";
import { x as x2 } from "./a";
import {} from "./a";`,
    },
});
