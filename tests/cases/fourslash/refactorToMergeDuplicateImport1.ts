/// <reference path='fourslash.ts' />

// @Filename: a.ts
//// export const a = 1;
//// export const b = 1;
//// export const c = 1;
//// export const d = 1;
//// export const e = 1;
//// export default { };

// @Filename: b.ts
//// /*a*/import A, { a, b, c } from './a';/*b*/
//// import { c, d, e } from './a';

// @Filename: c.ts
//// /*c*/import A, { a, b, c } from './a';/*d*/
//// import A, { c, d, e } from './a';

// @Filename: d.ts
//// /*e*/import { a, b, c } from './a';/*f*/
//// import A, { c, d, e } from './a';

// @Filename: e.ts
//// /*g*/import A, { a, b, c } from './a';/*h*/
//// import { c, d } from './a';
//// import { e, d } from './a';

// @Filename: f.ts
//// /*i*/import A, { a, b, c } from './a';/*j*/
//// import A, { c, d } from './a';
//// import A, { e, d } from './a';

// @Filename: g.ts
//// /*k*/import A, { a, b, c } from './a';/*l*/
//// import { c, d } from './a';
//// import A, { e, d } from './a';

// @Filename: h.ts
//// /*m*/import A, { a, b, c } from './a';/*n*/
//// import B, { c, d } from './a';

// @Filename: i.ts
//// /*o*/import A, { a, b, c } from './a';/*p*/
//// import A, { c, d } from './a';
//// import B, { c, d } from './a';

// @Filename: j.ts
//// /*q*/import { a, b, c } from './a';/*r*/
//// import B, { c, d } from './a';
//// import B, { c, d } from './a';

// @Filename: k.ts
//// /*s*/import { a, b, c } from './a';/*t*/
//// import { c, d, e } from './b';

goTo.file("b.ts");
goTo.select("a", "b");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("c.ts");
goTo.select("c", "d");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("d.ts");
goTo.select("e", "f");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("e.ts");
goTo.select("g", "h");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("f.ts");
goTo.select("i", "j");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("g.ts");
goTo.select("k", "l");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import A, { a, b, c, d, e } from './a';
`,
});

goTo.file("h.ts");
goTo.select("m", "n");
verify.not.refactorAvailable();

goTo.file("i.ts");
goTo.select("o", "p");
verify.not.refactorAvailable();

goTo.file("j.ts");
goTo.select("q", "r");
verify.refactorAvailable("Merge duplicate import declaration");
edit.applyRefactor({
    refactorName: "Merge duplicate import declaration",
    actionName: "Merge duplicate import declaration",
    actionDescription: "Merge duplicate import declaration",
    newContent: `import B, { a, b, c, d } from './a';
`,
});

goTo.file("k.ts");
goTo.select("s", "t");
verify.not.refactorAvailable()
