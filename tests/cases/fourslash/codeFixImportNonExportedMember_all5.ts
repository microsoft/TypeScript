/// <reference path="fourslash.ts" />

// @module: esnext
// @filename: /a.ts
////let a = 1, b = 1, c = 1;
////export { b };
////
////type T2 = number;
////type T1 = number;
////export type { T2 };

// @filename: /b.ts
////let a = 1, b = 1, c = 1;
////
////type T3 = number;
////type T4 = number;
////export type { T4 };

// @filename: /c.ts
////let a = 1, b = 1, c = 1;
////
////type T5 = number;
////type T6 = number;
////export { a };

// @filename: /d.ts
////export const a = 1;
////let b = 1, c = 1, d = 1;
////
////type T7 = number;
////type T8 = number;

// @filename: /e.ts
////import { T1, a } from "./a";
////import { T3, b } from "./b";
////import { T5, c } from "./c";
////import { T7, d } from "./d";

goTo.file("/e.ts");
verify.codeFixAll({
    fixId: "fixImportNonExportedMember",
    fixAllDescription: ts.Diagnostics.Export_all_referenced_locals.message,
    newFileContent: {
        "/a.ts":
`let a = 1, b = 1, c = 1;
export { b, a };

type T2 = number;
type T1 = number;
export type { T2, T1 };`,

        "/b.ts":
`let a = 1, b = 1, c = 1;

type T3 = number;
type T4 = number;
export type { T4, T3 };

export { b };
`,

        "/c.ts":
`let a = 1, b = 1, c = 1;

type T5 = number;
type T6 = number;
export { a, c, T5 };`,

        "/d.ts":
`export const a = 1;
let b = 1, c = 1, d = 1;

export type T7 = number;
type T8 = number;

export { d };
`,
    },
});
