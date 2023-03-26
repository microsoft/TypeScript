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
////[|const x = 0;
////const t = 2;
////function f() {}
////class C {}
////enum E {}
////namespace N { export const x = 0; }
////type T = number;
////interface I {}|]
////t;

verify.moveToAnotherFile({
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
const x = 0;
    export const t = 2;
    function f() { }
    class C { }
    enum E { }
    namespace N { export const x = 0; }
    type T = number;
    interface I { }
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
