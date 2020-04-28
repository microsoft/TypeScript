/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////let a = 1, b = 2, c = 3;
////export function whatever() {
////}

// @Filename: /b.ts
////let d = 4;
////export function whatever2() {
////}

// @Filename: /c.ts
////import { a } from "./a"
////import { d } from "./b"

goTo.file("/c.ts");
verify.codeFixAvailable([
    { description: `Export 'a' from module './a'` },
    { description: `Export 'd' from module './b'` },
    { description: `Remove import from './a'` },
    { description: `Remove import from './b'` },
]);
verify.codeFix({
    index: 0,
    description: `Export 'a' from module './a'`,
    newFileContent: {
        '/a.ts': `let a = 1, b = 2, c = 3;
export function whatever() {
}

export { a };
`
    }
});

verify.codeFix({
    index: 1,
    description: `Export 'd' from module './b'`,
    newFileContent: {
        '/b.ts': `export let d = 4;
export function whatever2() {
}`
    }
});
