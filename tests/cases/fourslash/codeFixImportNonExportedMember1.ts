/// <reference path='fourslash.ts' />
// @Filename: /a.ts
////declare function zoo(): any;
////export { zoo };

// @Filename: /b.ts
////declare function foo(): any;
////function bar(): any;
////export { foo };

// @Filename: /c.ts
////import { zoo } from "./a";
////import { bar } from "./b";

goTo.file("/c.ts");
verify.codeFixAvailable([
    { description: `Export 'bar' from module './b'` },
    { description: `Remove import from './a'` },
    { description: `Remove import from './b'` },
]);
verify.codeFix({
    index: 0,
    description: `Export 'bar' from module './b'`,
    newFileContent: {
        '/b.ts': `declare function foo(): any;
export function bar(): any;
export { foo };`
    }
});
