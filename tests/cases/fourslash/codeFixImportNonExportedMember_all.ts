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
    fixAllDescription: ts.Diagnostics.Export_all_non_exported_member.message,
    newFileContent: {
        '/a.ts': `export declare function foo(): any;
export declare function bar(): any;
declare function zoo(): any;
export { zoo }`
    }
});
