/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const abc = 0;

// @Filename: /b.ts
////acb/**/;

goTo.marker("");
verify.applyCodeActionFromCompletion("", {
    name: "abc",
    source: "/a",
    description: `Import 'abc' from module "./a"`,
    newFileContent: `import { abc } from "./a";

acb;`,
});
