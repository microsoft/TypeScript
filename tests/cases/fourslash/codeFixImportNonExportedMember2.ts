/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////let a = 1, b = 2, c = 3;
////let d = 4;
////export function whatever() {
////}

// @Filename: /b.ts
////import { a, d } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
    { description: `Export 'a' from module './a'` },
    { description: `Export 'd' from module './a'` },
    { description: `Remove import from './a'` },
]);
verify.codeFix({
    index: 0,
    description: `Export 'a' from module './a'`,
    newFileContent: {
        '/a.ts': `let a = 1, b = 2, c = 3;
let d = 4;
export function whatever() {
}

export { a };
`
    }
});

verify.codeFix({
    index: 1,
    description: `Export 'd' from module './a'`,
    newFileContent: {
        '/a.ts': `let a = 1, b = 2, c = 3;
export let d = 4;
export function whatever() {
}`
    }
});
