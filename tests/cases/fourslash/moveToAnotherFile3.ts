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
////import { p } from './other2';
////[|const y: Date = p + b;|]

verify.moveToAnotherFile({
    newFileContents: {
        "/a.ts":
`// header comment

import './foo';
import { a, alreadyUnused } from './other';
`,

        "/bar.ts":
`import './blah';
import './blah2';
import { b } from './other';
import { p } from './other2';
const a = 2;
a;
const y: Date = p + b;
`,
    },
    newFile: "/bar.ts",

    preferences: {
        quotePreference: "single",
    }
});
