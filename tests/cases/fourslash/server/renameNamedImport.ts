/// <reference path='../fourslash.ts' />

// @Filename: /home/src/workspaces/project/lib/tsconfig.json
//// { "compilerOptions": { "lib": ["es5"] } }

// @Filename: /home/src/workspaces/project/lib/index.ts
//// const unrelatedLocalVariable = 123;
//// export const someExportedVariable = unrelatedLocalVariable;

// @Filename: /home/src/workspaces/project/src/tsconfig.json
//// { "compilerOptions": { "lib": ["es5"] } }

// @Filename: /home/src/workspaces/project/src/index.ts
//// import { /*i*/someExportedVariable } from '../lib/index';
//// someExportedVariable;

// @Filename: /home/src/workspaces/project/tsconfig.json
//// { "compilerOptions": { "lib": ["es5"] } }

goTo.file("/home/src/workspaces/project/lib/index.ts");
goTo.file("/home/src/workspaces/project/src/index.ts");
verify.baselineRename("i", { providePrefixAndSuffixTextForRename: true });
