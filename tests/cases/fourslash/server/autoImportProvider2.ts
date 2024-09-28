/// <reference path="../fourslash.ts" />

// @Filename: /home/src/workspaces/project/node_modules/direct-dependency/package.json
//// { "name": "direct-dependency", "dependencies": { "indirect-dependency": "*" } }

// @Filename: /home/src/workspaces/project/node_modules/direct-dependency/index.d.ts
//// import "indirect-dependency";
//// export declare class DirectDependency {}

// @Filename: /home/src/workspaces/project/node_modules/indirect-dependency/package.json
//// { "name": "indirect-dependency" }

// @Filename: /home/src/workspaces/project/node_modules/indirect-dependency/index.d.ts
//// export declare class IndirectDependency

// @Filename: /home/src/workspaces/project/tsconfig.json
//// {}

// @Filename: /home/src/workspaces/project/package.json
//// { "dependencies": { "direct-dependency": "*" } }

// @Filename: /home/src/workspaces/project/index.ts
//// IndirectDependency/**/



// `IndirectDependency` is in the autoImportProvider program, but
// filtered out of the suggestions because it is not a direct
// dependency of the project.

goTo.marker("");
format.setOption("newLineCharacter", "\n");
verify.importFixAtPosition([]);
