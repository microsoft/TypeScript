/// <reference path="fourslash.ts" />

// @checkJs: true

// @Filename: /a.ts
//// /// <reference path="b.ts/**/" />

// @Filename: /b.ts
//// console.log("b.ts");

// @Filename: /c.js
//// require("./b");

verify.baselineFindAllReferences("");
