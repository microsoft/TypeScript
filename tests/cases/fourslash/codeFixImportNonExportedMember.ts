/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////declare function foo(): any;
////declare function bar(): any;
////export { foo };

// @Filename: /b.ts
////import { bar } from "./a";

goTo.file("/b.ts");
verify.codeFixAvailable([
    { description: `Export 'bar' from module './a'` },
    { description: `Remove import from './a'` },
]);
verify.codeFix({
    index: 0,
    description: `Export 'bar' from module './a'`,
    newFileContent: {
        '/a.ts': `declare function foo(): any;
declare function bar(): any;
export { foo };

export { bar };
`
    }
});
