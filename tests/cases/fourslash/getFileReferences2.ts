/// <reference path="fourslash.ts" />

// @Filename: /project/a.ts
//// console.log("I'm a script!");

// @Filename: /project/b.ts
//// import "./a";

verify.baselineGetFileReferences("/project/a.ts");
