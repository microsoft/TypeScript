/// <reference path="fourslash.ts" />

// @module: esnext

// @Filename: /a.ts
////export const foo = 0;

// @Filename: /b.ts
////fo/**/

goTo.marker("");
verify.applyCodeActionFromCompletion("", {
    name: "foo",
    source: "/a",
    description: `Import 'foo' from module "./a"`,
    preferences: {
        quotePreference: "single",
    },
    newFileContent: `import { foo } from './a';

fo`,
});
