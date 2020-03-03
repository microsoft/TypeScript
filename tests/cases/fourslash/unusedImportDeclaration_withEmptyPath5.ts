/// <reference path='fourslash.ts' />

// @Filename: /main.ts
////// leading trivia
////import { a } from "./a";
////import { b } from "./b";
////import { c } from "./c";

// @Filename: /a.ts
////export const a = null;

// @Filename: /b.ts
////export const b = null;

// @Filename: /c.ts
////export const c = null;

verify.codeFix({
    index: 0,
    description: "Remove import from './a'",
    newFileContent:
`// leading trivia
import { b } from "./b";
import { c } from "./c";`,
});

verify.codeFix({
    index: 1,
    description: "Remove import from './b'",
    newFileContent:
`// leading trivia
import { a } from "./a";
import { c } from "./c";`,
});

verify.codeFix({
    index: 2,
    description: "Remove import from './c'",
    newFileContent:
`// leading trivia
import { a } from "./a";
import { b } from "./b";
`,
});
