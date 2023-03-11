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

var copy = format.copyFormatOptions();
copy.ConvertTabsToSpaces = false;
format.setFormatOptions(copy);

verify.moveToNewFile({
    newFileContents: {
        "/a.ts":
``,
        "/f.ts":
`function f() {
	const x = 0;
}


const a = 0;

const b = 0;

const c = 0;
const d = 0;
const e = 0;
`,
    },
});
