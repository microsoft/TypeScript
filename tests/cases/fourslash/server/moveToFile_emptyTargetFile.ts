/// <reference path='../fourslash.ts' />

// @Filename: /home/src/workspaces/project/source.ts
////[|export const a = 1;|]
////const b = 2;
////console.log(a, b);

// @Filename: /home/src/workspaces/project/target.ts
/////** empty */

// @Filename: /home/src/workspaces/project/tsconfig.json
///// { "compilerOptions": { "newLine": "lf" } }

verify.moveToFile({
    newFileContents: {
        "/home/src/workspaces/project/source.ts":
`import { a } from "./target";

const b = 2;
console.log(a, b);`,
        "/home/src/workspaces/project/target.ts":
`/** empty */
export const a = 1;
`,
    },
    interactiveRefactorArguments: { targetFile: "/home/src/workspaces/project/target.ts" },
});
