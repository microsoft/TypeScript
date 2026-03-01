/// <reference path='fourslash.ts' />

// @lib: dom

// @Filename: /a.ts
//// export default class Event {}

// @Filename: /b.ts
//// import Event from './a.js';
//// [|export function test(test: Event): void {}|]

verify.noErrors();

verify.moveToNewFile({
    newFileContents: {
        "/b.ts": "",

        "/test.ts":
`import Event from './a';

export function test(test: Event): void { }
`,
    },
});
