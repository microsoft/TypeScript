/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.d.ts
////declare const x: number;
////export = x;

// @Filename: /b.ts
/////*com meant*/import * as [|a|] from "./a";/*tnem moc*/
////a;

// @Filename: /c.ts
/////*com meant*/import [|a|] = require("./a");/*tnem moc*/
////a;

// @Filename: /d.ts
////import "./a";

// @Filename: /e.ts
////import * as n from "./non-existent";
////n;

// @Filename: /f.ts
////export import [|foo|] = require("./a");

for (const file of ["/b.ts", "/c.ts"]) {
    goTo.file(file);

    verify.getSuggestionDiagnostics([{
        message: "Import may be converted to a default import.",
        range: test.ranges().find(r => r.fileName === file),
        code: 80003,
    }]);

    verify.codeFix({
        description: "Convert to default import",
        newFileContent:
`/*com meant*/import a from "./a";/*tnem moc*/
a;`,
    });
}

for (const file of ["/d.ts", "/e.ts", "/f.ts"]) {
    goTo.file(file);
    verify.getSuggestionDiagnostics([]);
}
