/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////let a = 1, b = 2, c = 3;
////let d = 4;
////export function whatever() {
////}
////export { d }

// @Filename: /b.ts
////import { a, d } from "./a"

goTo.file("/b.ts");
verify.codeFixAvailable([
    { description: `Export 'a' from module './a'` },
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
export { d, a };`
    }
});
