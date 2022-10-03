/// <reference path="fourslash.ts" />

// @moduleResolution: node

// @Filename: /foo/index.ts
////export const foo = 0;

// @Filename: /a.ts
////foo;

// @Filename: /b.ts
////foo;

// @Filename: /c.ts
////foo;

const tests: ReadonlyArray<[string, FourSlashInterface.UserPreferences["importModuleSpecifierEnding"], string]> = [
    ["/a.ts", "js", "./foo/index.js"],
    ["/b.ts", "index", "./foo/index"],
    ["/c.ts", "minimal", "./foo"],
];

for (const [fileName, importModuleSpecifierEnding, specifier] of tests) {
    goTo.file(fileName);
    verify.importFixAtPosition([`import { foo } from "${specifier}";\n\nfoo;`,], /*errorCode*/ undefined, { importModuleSpecifierEnding });
}
