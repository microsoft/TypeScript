/// <reference path='fourslash.ts' />

// @allowSyntheticDefaultImports: true

// @Filename: /a.d.ts
////declare const x: number;
////export = x;

// @Filename: /b.ts
////import * as [|a|] from "./a";

// @Filename: /c.ts
////import [|a|] = require("./a");

// @Filename: /d.ts
////import "./a";

// @Filename: /e.ts
////import * as n from "./non-existant";

for (const file of ["/b.ts", "/c.ts"]) {
    goTo.file(file);

    verify.getSuggestionDiagnostics([{
        message: "Import may be converted to a default import.",
        range: test.ranges().find(r => r.fileName === file),
        code: 80003,
    }]);

    verify.codeFix({
        description: "Convert to default import",
        newFileContent: `import a from "./a";`,
    });
}

for (const file of ["/d.ts", "/e.ts"]) {
    goTo.file(file);
    verify.getSuggestionDiagnostics([]);
}
