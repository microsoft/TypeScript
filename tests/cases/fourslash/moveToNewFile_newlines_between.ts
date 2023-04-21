/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|function f() {
////	const x = 0;
////}
////
////
////const a = 0;
////
////const b = 0;
////
////const c = 0;
////const d = 0;
////const e = 0;
////|]
////b
////export {}

var copy = format.copyFormatOptions();
copy.ConvertTabsToSpaces = false;
format.setFormatOptions(copy);

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
`import { b } from "./b";

b
export {}`,
        "/b.ts":
`function f() {
	const x = 0;
}


const a = 0;

export const b = 0;

const c = 0;
const d = 0;
const e = 0;
`,
    },
});
