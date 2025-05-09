/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export default function ad() {}
////export const a0 = 0;

// @Filename: /b.ts
////export default function bd() {}
////export const b0 = 0;

// @Filename: /c.ts
////export default function cd() {}
////export const c0 = 0;

// @Filename: /d.ts
////export default function dd() {}
////export const d0 = 0;
////export const d1 = 1;

// @Filename: /e.d.ts
////declare function e(): void;
////export = e;

// @Filename: /disposable.d.ts
////export declare class Disposable { }

// @Filename: /disposable_global.d.ts
////interface Disposable { }

// @Filename: /user.ts
////import * as b from "./b";
////import { } from "./c";
////import dd from "./d";
////
////ad; ad; a0; a0;
////bd; bd; b0; b0;
////cd; cd; c0; c0;
////dd; dd; d0; d0; d1; d1;
////e; e;
////class X extends Disposable { }

goTo.file("/user.ts");
verify.codeFixAll({
    fixId: "fixMissingImport",
    fixAllDescription: "Add all missing imports",
    newFileContent:
`import ad, { a0 } from "./a";
import bd, * as b from "./b";
import cd, { c0 } from "./c";
import dd, { d0, d1 } from "./d";
import { Disposable } from "./disposable";
import e = require("./e");

ad; ad; a0; a0;
bd; bd; b.b0; b.b0;
cd; cd; c0; c0;
dd; dd; d0; d0; d1; d1;
e; e;
class X extends Disposable { }`,
});
