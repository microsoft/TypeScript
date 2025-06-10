
currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::--p project --pretty false
//// [/home/src/workspaces/solution/no-preserve/index.d.ts] new file
export declare const enum F { A = 1 }
//// [/home/src/workspaces/solution/no-preserve/index.ts] new file
export const enum E { A = 1 }
//// [/home/src/workspaces/solution/no-preserve/tsconfig.json] new file
{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": false,
					},
				}
//// [/home/src/workspaces/solution/preserve/index.d.ts] new file
export declare const enum E { A = 1 }
//// [/home/src/workspaces/solution/preserve/index.ts] new file
export const enum E { A = 1 }
//// [/home/src/workspaces/solution/preserve/tsconfig.json] new file
{
					"compilerOptions": {
						"composite": true,
						"declaration": true,
						"preserveConstEnums": true,
					},
				}
//// [/home/src/workspaces/solution/project/index.ts] new file

				import { E } from "../preserve";
				import { F } from "../no-preserve";
				E.A;
				F.A;
//// [/home/src/workspaces/solution/project/tsconfig.json] new file
{
					"compilerOptions": {
						"module": "preserve",
						"verbatimModuleSyntax": true,
					},
					"references": [
						{ "path": "../preserve" },
						{ "path": "../no-preserve" },
					],
				}

ExitStatus:: 2

CompilerOptions::{
    "project": "/home/src/workspaces/solution/project",
    "pretty": false
}
Output::
project/index.ts(3,14): error TS2748: Cannot access ambient const enums when 'verbatimModuleSyntax' is enabled.
//// [/home/src/workspaces/solution/no-preserve/index.d.ts] no change
//// [/home/src/workspaces/solution/no-preserve/index.ts] no change
//// [/home/src/workspaces/solution/no-preserve/tsconfig.json] no change
//// [/home/src/workspaces/solution/preserve/index.d.ts] no change
//// [/home/src/workspaces/solution/preserve/index.ts] no change
//// [/home/src/workspaces/solution/preserve/tsconfig.json] no change
//// [/home/src/workspaces/solution/project/index.js] new file
import { E } from "../preserve";
import { F } from "../no-preserve";
E.A;
F.A;

//// [/home/src/workspaces/solution/project/index.ts] no change
//// [/home/src/workspaces/solution/project/tsconfig.json] no change

