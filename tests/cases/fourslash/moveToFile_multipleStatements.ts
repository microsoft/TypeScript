/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import { } from './somefile';
////const a = 12;

// @Filename: /a.ts
////[|const q = 0;
////const t = 2;
////function f() {}
////class C {}
////enum E {}
////namespace N { export const h = 0; }
////type T = number;
////interface I {}|]

verify.moveToFile({
    newFileContents: {
        "/a.ts":
``,

        "/bar.ts":
`import { } from './somefile';
const a = 12;
const q = 0;
const t = 2;
function f() { }
class C { }
enum E { }
namespace N { export const h = 0; }
type T = number;
interface I { }
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.ts" }
});
