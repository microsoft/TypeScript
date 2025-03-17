
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--noEmit
//// [/home/src/workspaces/project/class1.ts] new file
export class class1 {}
//// [/home/src/workspaces/project/tsconfig.json] new file
{
	"compilerOptions": {
		"incremental": true,
		"strict": true,
	},
}

ExitStatus:: 7

CompilerOptions::{
    "noEmit": true
}
Output::
No output
//// [/home/src/workspaces/project/class1.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

