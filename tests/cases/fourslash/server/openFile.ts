/// <reference path="../fourslash.ts"/>

// @Filename: test1.ts
////t.

// @Filename: test.ts
////var t = '10';

// @Filename: tsconfig.json
////{ "files": ["test.ts", "test1.ts"] }

var overridingContent = "var t = 10; t.";
goTo.file("test.ts", overridingContent);
goTo.file("test1.ts");
goTo.eof();
verify.completions({ includes: "toExponential" });
