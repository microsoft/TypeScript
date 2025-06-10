
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--p app --pretty false
//// [/home/src/workspaces/project/app/src/index.ts] new file

					import local from "./local"; // Error
					import esm from "esm-package"; // Error
					import referencedSource from "../../lib/src/a"; // Error
					import referencedDeclaration from "../../lib/dist/a"; // Error
					import ambiguous from "ambiguous-package"; // Ok
//// [/home/src/workspaces/project/app/src/local.ts] new file
export const local = 0;
//// [/home/src/workspaces/project/app/tsconfig.json] new file
{
					"compilerOptions": {
						"module": "esnext",
						"moduleResolution": "bundler",
						"rootDir": "src",
						"outDir": "dist",
					},
					"include": ["src"],
					"references": [
						{ "path": "../lib" },
					],
				}
//// [/home/src/workspaces/project/lib/dist/a.d.ts] new file
export declare const a = 0;
//// [/home/src/workspaces/project/lib/src/a.ts] new file
export const a = 0;
//// [/home/src/workspaces/project/lib/tsconfig.json] new file
{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"rootDir": "src",
						"outDir": "dist",
						"module": "esnext",
						"moduleResolution": "bundler",
					},
					"include": ["src"],
				}
//// [/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts] new file
export declare const ambiguous: number;
//// [/home/src/workspaces/project/node_modules/ambiguous-package/package.json] new file
{ "name": "ambiguous-package" }
//// [/home/src/workspaces/project/node_modules/esm-package/index.d.ts] new file
export declare const esm: number;
//// [/home/src/workspaces/project/node_modules/esm-package/package.json] new file
{ "name": "esm-package", "type": "module" }

ExitStatus:: 2

CompilerOptions::{
    "project": "/home/src/workspaces/project/app",
    "pretty": false
}
Output::
app/src/index.ts(2,13): error TS2613: Module '"/home/src/workspaces/project/app/src/local"' has no default export. Did you mean to use 'import { local } from "/home/src/workspaces/project/app/src/local"' instead?

app/src/index.ts(3,13): error TS2613: Module '"/home/src/workspaces/project/node_modules/esm-package/index"' has no default export. Did you mean to use 'import { esm } from "/home/src/workspaces/project/node_modules/esm-package/index"' instead?
//// [/home/src/workspaces/project/app/dist/index.js] new file
export {};

//// [/home/src/workspaces/project/app/dist/local.js] new file
export const local = 0;

//// [/home/src/workspaces/project/app/src/index.ts] no change
//// [/home/src/workspaces/project/app/src/local.ts] no change
//// [/home/src/workspaces/project/app/tsconfig.json] no change
//// [/home/src/workspaces/project/lib/dist/a.d.ts] no change
//// [/home/src/workspaces/project/lib/src/a.ts] no change
//// [/home/src/workspaces/project/lib/tsconfig.json] no change
//// [/home/src/workspaces/project/node_modules/ambiguous-package/index.d.ts] no change
//// [/home/src/workspaces/project/node_modules/ambiguous-package/package.json] no change
//// [/home/src/workspaces/project/node_modules/esm-package/index.d.ts] no change
//// [/home/src/workspaces/project/node_modules/esm-package/package.json] no change

