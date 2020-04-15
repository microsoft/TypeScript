/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////declare function foo(): any;
////declare function bar(): any;
////declare function zoo(): any;
////export { zoo }

// @Filename: /b.ts
////import { foo, bar } from "./a";

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "importNonExportedMember",
    fixAllDescription: "Export all non-exported member",
    newFileContent: {
        '/a.ts': `declare function foo(): any;
declare function bar(): any;
declare function zoo(): any;
export { zoo }

export { foo };


export { bar };
`
    }
});
