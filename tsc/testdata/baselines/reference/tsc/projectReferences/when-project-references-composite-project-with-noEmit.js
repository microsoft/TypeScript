
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
//// [/home/src/workspaces/solution/src/utils/index.ts] new file
export const x = 10;
//// [/home/src/workspaces/solution/src/utils/tsconfig.json] new file
{
	"compilerOptions": {
		"composite": true,
		"noEmit": true,
	},
}

ExitStatus:: 2

CompilerOptions::{
    "project": "/home/src/workspaces/solution/project"
}
Output::
project/index.ts(1,19): error TS2307: Cannot find module '../utils' or its corresponding type declarations.


Found 1 error in project/index.ts[90m:1[0m

//// [/home/src/workspaces/solution/project/index.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/project/index.ts] no change
//// [/home/src/workspaces/solution/project/tsconfig.json] no change
//// [/home/src/workspaces/solution/src/utils/index.ts] no change
//// [/home/src/workspaces/solution/src/utils/tsconfig.json] no change

