
currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::--p project
//// [/home/src/workspaces/solution/project/index.ts] new file
import { x } from "../utils";
//// [/home/src/workspaces/solution/project/tsconfig.json] new file
{
	"references": [
		{ "path": "../utils" },
	],
}
//// [/home/src/workspaces/solution/utils/index.d.ts] new file
export declare const x = 10;
//// [/home/src/workspaces/solution/utils/index.ts] new file
export const x = 10;
//// [/home/src/workspaces/solution/utils/tsconfig.json] new file
{
	"compilerOptions": {
		"composite": true,
	},
}

ExitStatus:: 0

CompilerOptions::{
    "project": "/home/src/workspaces/solution/project"
}
Output::
//// [/home/src/workspaces/solution/project/index.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/project/index.ts] no change
//// [/home/src/workspaces/solution/project/tsconfig.json] no change
//// [/home/src/workspaces/solution/utils/index.d.ts] no change
//// [/home/src/workspaces/solution/utils/index.ts] no change
//// [/home/src/workspaces/solution/utils/tsconfig.json] no change

