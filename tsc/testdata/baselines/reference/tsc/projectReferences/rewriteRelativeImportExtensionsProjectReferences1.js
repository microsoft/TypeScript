
currentDirectory::/home/src/workspaces
useCaseSensitiveFileNames::true
Input::-p packages/main --pretty false
//// [/home/src/workspaces/packages/common/dist/index.d.ts] new file
export {};
//// [/home/src/workspaces/packages/common/package.json] new file
{
						"name": "common",
						"version": "1.0.0",
						"type": "module",
						"exports": {
							".": {
								"source": "./src/index.ts",
								"default": "./dist/index.js"
							}
						}
				}
//// [/home/src/workspaces/packages/common/src/index.ts] new file
export {};
//// [/home/src/workspaces/packages/common/tsconfig.json] new file
{
					"compilerOptions": {
						"composite": true,
						"rootDir": "src",
						"outDir": "dist", 
						"module": "nodenext"
					}
				}
//// [/home/src/workspaces/packages/main/package.json] new file
{ "type": "module" }
//// [/home/src/workspaces/packages/main/src/index.ts] new file
import {} from "../../common/src/index.ts";
//// [/home/src/workspaces/packages/main/tsconfig.json] new file
{
					"compilerOptions": {
						"module": "nodenext",
						"rewriteRelativeImportExtensions": true,
						"rootDir": "src",
						"outDir": "dist"
					},
					"references": [
						{ "path": "../common" }
					]
				}

ExitStatus:: 2

CompilerOptions::{
    "project": "/home/src/workspaces/packages/main",
    "pretty": false
}
Output::
packages/main/src/index.ts(1,16): error TS2878: This import path is unsafe to rewrite because it resolves to another project, and the relative path between the projects' output files is not the same as the relative path between its input files.
//// [/home/src/workspaces/packages/common/dist/index.d.ts] no change
//// [/home/src/workspaces/packages/common/package.json] no change
//// [/home/src/workspaces/packages/common/src/index.ts] no change
//// [/home/src/workspaces/packages/common/tsconfig.json] no change
//// [/home/src/workspaces/packages/main/dist/index.js] new file
export {};

//// [/home/src/workspaces/packages/main/package.json] no change
//// [/home/src/workspaces/packages/main/src/index.ts] no change
//// [/home/src/workspaces/packages/main/tsconfig.json] no change

