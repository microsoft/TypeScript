/// <reference path='../fourslash.ts' />

// @Filename: /source.ts
////[|export const a = 1;|]
////const b = 2;
////console.log(a, b);

// @Filename: /target.ts
/////** empty */

// @Filename: /tsconfig.json
///// { "compilerOptions": { "newLine": "lf" } }

verify.moveToFile({
    newFileContents: {
        "/source.ts":
`import { a } from "./target";

const b = 2;
console.log(a, b);`,
        "/target.ts":
`/** empty */
export const a = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/target.ts" },
});
