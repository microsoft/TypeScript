/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////export const foo: number;

// @Filename: /b.ts
////[|foo;|]

goTo.file("/b.ts");
verify.importFixAtPosition([
`import { foo } from './a';

foo;`,
], /*errorCode*/ undefined, {
    quotePreference: "single",
});
