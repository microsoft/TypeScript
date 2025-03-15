/// <reference path='fourslash.ts' />

// @module: commonjs
// @moduleResolution: node
// @allowSyntheticDefaultImports: true

// @Filename: /node_modules/gensync-BABEL_8_BREAKING-true/index.d.ts
//// export = 'default';

// @Filename: /a.ts
//// export import [|foo|] = require("gensync-BABEL_8_BREAKING-true");

goTo.file('/a.ts');
verify.getSuggestionDiagnostics([{
    message: "Import may be converted to a default import.",
    code: 80003,
}]);
verify.codeFix({
    description: "Convert to default import",
    newFileContent: `import foo from "gensync-BABEL_8_BREAKING-true";
export { foo };
`,
});