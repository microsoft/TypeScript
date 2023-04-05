/// <reference path='fourslash.ts' />

//@Filename: /bar.ts
////import './blah';
////import './blah2';
////const a = 2;
////a;

// @Filename: /a.ts
////// header comment
////
////import './foo';
////import { a, b, alreadyUnused } from './other';
////const p = 0;
////[|const q = 0;
////const t = 2;
////function f() {}
////class C {}
////enum E {}
////namespace N { export const h = 0; }
////type T = number;
////interface I {}|]
////t;

// @Filename: /other.ts
////export const b = 1;
////export const a = 2;
////export const alreadyUnused = "unused";

verify.moveToFile({
    newFileContents: {
        "/a.ts":
`// header comment

import { t } from './bar';
import './foo';
import { a, b, alreadyUnused } from './other';
const p = 0;
t;`,

        "/bar.ts":
`import './blah';
import './blah2';
const a = 2;
a;
const q = 0;
export const t = 2;
function f() { }
class C { }
enum E { }
namespace N { export const h = 0; }
type T = number;
interface I { }
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
