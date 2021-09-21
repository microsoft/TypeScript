/// <reference path="fourslash.ts" />
// @allowJs: true
// @Filename: /src/module.mts
//// export {}
// @Filename: /src/module.cts
//// export {}
// @Filename: /src/decl.d.mts
//// export {}
// @Filename: /src/decl.d.cts
//// export {}
// @Filename: /src/js.mjs
//// export {}
// @Filename: /src/js.cjs
//// export {}

// @Filename: /src/main.mts
//// import {} from ".//**/";

verify.completions({
    marker: "",
    exact: ["decl.cjs", "decl.mjs", "js.cjs", "js.mjs", "module.cjs", "module.mjs"],
    isNewIdentifierLocation: true,
});