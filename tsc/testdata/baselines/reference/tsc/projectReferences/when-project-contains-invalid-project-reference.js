
currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::--p project
//// [/home/src/workspaces/solution/project/index.ts] new file
export const x = 10;
//// [/home/src/workspaces/solution/project/tsconfig.json] new file
{
	"references": [
		{ "path": "../utils" },
	],
}

ExitStatus:: 0

CompilerOptions::{
    "project": "/home/src/workspaces/solution/project"
}
Output::
//// [/home/src/workspaces/solution/project/index.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

//// [/home/src/workspaces/solution/project/index.ts] no change
//// [/home/src/workspaces/solution/project/tsconfig.json] no change

