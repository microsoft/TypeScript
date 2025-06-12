
currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::--p src/services --pretty false
//// [/home/src/workspaces/solution/dist/compiler/parser.d.ts] new file
export {};
//// [/home/src/workspaces/solution/src/compiler/parser.ts] new file
export {};
//// [/home/src/workspaces/solution/src/compiler/tsconfig.json] new file
{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"rootDir": ".",
						"outDir": "../../dist/compiler"
					}
				}
//// [/home/src/workspaces/solution/src/services/services.ts] new file
import {} from "../compiler/parser.ts";
//// [/home/src/workspaces/solution/src/services/tsconfig.json] new file
{
					"extends": "../tsconfig-base.json",
					"compilerOptions": {
						"rootDir": ".", 
						"outDir": "../../dist/services"
					},
					"references": [
						{ "path": "../compiler" }
					]
				}
//// [/home/src/workspaces/solution/src/tsconfig-base.json] new file
{
					"compilerOptions": { 
						"module": "nodenext",
						"composite": true,
						"rewriteRelativeImportExtensions": true
					}
				}

ExitStatus:: 0

CompilerOptions::{
    "project": "/home/src/workspaces/solution/src/services",
    "pretty": false
}
Output::
No output
//// [/home/src/workspaces/solution/dist/compiler/parser.d.ts] no change
//// [/home/src/workspaces/solution/dist/services/services.d.ts] new file
export {};

//// [/home/src/workspaces/solution/dist/services/services.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/src/compiler/parser.ts] no change
//// [/home/src/workspaces/solution/src/compiler/tsconfig.json] no change
//// [/home/src/workspaces/solution/src/services/services.ts] no change
//// [/home/src/workspaces/solution/src/services/tsconfig.json] no change
//// [/home/src/workspaces/solution/src/tsconfig-base.json] no change

