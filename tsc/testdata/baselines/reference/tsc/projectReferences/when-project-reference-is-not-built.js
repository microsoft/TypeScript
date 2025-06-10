
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
//// [/home/src/workspaces/solution/utils/index.ts] new file
export const x = 10;
//// [/home/src/workspaces/solution/utils/tsconfig.json] new file
{
	"compilerOptions": {
		"composite": true,
	},
}

ExitStatus:: 2

CompilerOptions::{
    "project": "/home/src/workspaces/solution/project"
}
Output::
[96mproject/index.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS6305: [0mOutput file '/home/src/workspaces/solution/utils/index.d.ts' has not been built from source file '/home/src/workspaces/solution/utils/index.ts'.

[7m1[0m import { x } from "../utils";
[7m [0m [91m                  ~~~~~~~~~~[0m


Found 1 error in project/index.ts[90m:1[0m

//// [/home/src/workspaces/solution/project/index.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/project/index.ts] no change
//// [/home/src/workspaces/solution/project/tsconfig.json] no change
//// [/home/src/workspaces/solution/utils/index.ts] no change
//// [/home/src/workspaces/solution/utils/tsconfig.json] no change

