/// <reference path='fourslash.ts' />

// @module: node18

// @Filename: /bar.cts
////const a = 2;

// @Filename: /node_modules/esm-only/package.json
//// {
////     "name": "esm-only",
////     "version": "1.0.0",
////     "type": "module",
////     "exports": {
////         ".": {
////             "import": "./index.js"
////         }
////     }
//// }

// @Filename: /node_modules/esm-only/index.d.ts
//// export declare const esm: any;

// @Filename: /main.mts
//// import { esm } from "esm-only";
//// [|esm.ohno;|]

verify.moveToFile({
    newFileContents: {
        "/main.mts":``,

        "/bar.cts":
`const a = 2;
esm.ohno;
`,
    },
    interactiveRefactorArguments: { targetFile: "/bar.cts" }
});