/// <reference path="../fourslash.ts" />

// @Filename: /node_modules/direct-dependency/package.json
//// { "name": "direct-dependency", "dependencies": { "indirect-dependency": "*" } }

// @Filename: /node_modules/direct-dependency/index.d.ts
//// import "indirect-dependency";
//// export declare class DirectDependency {}

// @Filename: /node_modules/indirect-dependency/package.json
//// { "name": "indirect-dependency" }

// @Filename: /node_modules/indirect-dependency/index.d.ts
//// export declare class IndirectDependency

// @Filename: /tsconfig.json
//// {}

// @Filename: /package.json
//// { "dependencies": { "direct-dependency": "*" } }

// @Filename: /index.ts
//// IndirectDependency/**/



// `IndirectDependency` is in the autoImportProvider program, but
// filtered out of the suggestions because it is not a direct
// dependency of the project.

goTo.marker("");
format.setOption("newLineCharacter", "\n");
verify.importFixAtPosition([]);
