/// <reference path="fourslash.ts" />

// @Filename: f1.ts
//// /* /*0*/ blah /*1*/ */

// @Filename: f2.ts
//// /* /*2*/ blah /*3*/

for (let i = 0; i < 4; ++i) {
    goTo.marker(`${i}`);
    verify.isInMultiLineComment();
}