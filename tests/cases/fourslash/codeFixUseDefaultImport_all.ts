/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.d.ts
////declare const x: number;
////export = x;

// @Filename: /b.ts
////import * as [|a1|] from "./a";
////import [|a2|] = require("./a");

goTo.file("/b.ts");
verify.codeFixAll({
    fixId: "useDefaultImport",
    // TODO: GH#22337
    newFileContent: `import a1 from "./a";import a2 from "./a";`,
});
