/// <reference path="fourslash.ts" />

// @module: esnext
// @moduleResolution: bundler

// @Filename: /orig.ts
//// [|export const variable = undefined;|]

verify.moveToFile({
    newFileContents: {
      "/orig.ts": "",
      "/new.ts": "export const variable = undefined;\n"
    },
    interactiveRefactorArguments: { targetFile: "/new.ts" },
});
