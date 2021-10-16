/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const abc = 0;

// @Filename: /b.ts
////acb/*1*/;

// @Filename: /c.ts
////acb/*2*/;

goTo.marker("1");
verify.applyCodeActionFromCompletion("1", {
    name: "abc",
    source: "/a",
    description: `Import 'abc' from module "./a"`,
    newFileContent: `import { abc } from "./a";

acb;`,
});

goTo.marker("2");
verify.applyCodeActionFromCompletion("2", {
    name: "abc",
    source: "/a",
    data: {
        exportName: "abc",
        fileName: "/a.ts",
    },
    description: `Import 'abc' from module "./a"`,
    newFileContent: `import { abc } from "./a";

acb;`,
});
