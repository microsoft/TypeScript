/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
//// export var foo: number = 1;
//// export var jkl: number = 2;
//// export type MyType = string;

// @Filename: m2.ts
//// import { /*1*/ } from "./m1"
//// import type { /*2*/ } from "./m1"
//// import { type /*3*/ } from "./m1"
//// import { foo as foo1, /*4*/ } from "./m1"
//// import type { foo as foo2, /*5*/ } from "./m1"
////
//// import { M/*6*/ } from "./m1"
//// import type { M/*7*/ } from "./m1"
//// import { type M/*8*/ } from "./m1"

const type = { name: "type", sortText: completion.SortText.GlobalsOrKeywords };

verify.completions(
    { marker: ["1", "6"], exact: ["foo", "jkl", "MyType", type] },
    { marker: ["2", "3", "7", "8"], exact: ["foo", "jkl", "MyType"] },
    { marker: "4", exact: ["jkl", "MyType", type] },
    { marker: "5", exact: ["jkl", "MyType"] },
);
