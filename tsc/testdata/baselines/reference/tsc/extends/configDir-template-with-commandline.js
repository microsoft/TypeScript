
currentDirectory::/home/src/projects/myproject
useCaseSensitiveFileNames::true
Input::--explainFiles --outDir ${configDir}/outDir
//// [/home/src/projects/configs/first/tsconfig.json] new file
{
	"extends": "../second/tsconfig.json",
	"include": ["${configDir}/src"],
	"compilerOptions": {
		"typeRoots": ["root1", "${configDir}/root2", "root3"],
		"types": [],
	},
}
//// [/home/src/projects/configs/second/tsconfig.json] new file
{
	"files": ["${configDir}/main.ts"],
	"compilerOptions": {
		"declarationDir": "${configDir}/decls",
		"paths": {
			"@myscope/*": ["${configDir}/types/*"],
			"other/*": ["other/*"],
		},
		"baseUrl": "${configDir}",
	},
	"watchOptions": {
		"excludeFiles": ["${configDir}/main.ts"],
	},
}
//// [/home/src/projects/myproject/main.ts] new file

	// some comment
	export const y = 10;
	import { x } from "@myscope/sometype";

//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] new file

	export const k = 10;

//// [/home/src/projects/myproject/src/secondary.ts] new file

	// some comment
	export const z = 10;
	import { k } from "other/sometype2";

//// [/home/src/projects/myproject/tsconfig.json] new file
{
	"extends": "../configs/first/tsconfig.json",
	"compilerOptions": {
		"declaration": true,
		"outDir": "outDir",
		"traceResolution": true,
	},
}
//// [/home/src/projects/myproject/types/sometype.ts] new file

	export const x = 10;


ExitStatus:: 2

CompilerOptions::{
    "outDir": "/home/src/projects/myproject/${configDir}/outDir",
    "explainFiles": true
}
Output::
src/secondary.ts(4,20): error TS2307: Cannot find module 'other/sometype2' or its corresponding type declarations.


Found 1 error in src/secondary.ts[90m:4[0m

//// [/home/src/projects/configs/first/tsconfig.json] no change
//// [/home/src/projects/configs/second/tsconfig.json] no change
//// [/home/src/projects/myproject/${configDir}/outDir/main.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;

//// [/home/src/projects/myproject/${configDir}/outDir/src/secondary.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
// some comment
exports.z = 10;

//// [/home/src/projects/myproject/${configDir}/outDir/types/sometype.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

//// [/home/src/projects/myproject/main.ts] no change
//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts] no change
//// [/home/src/projects/myproject/src/secondary.ts] no change
//// [/home/src/projects/myproject/tsconfig.json] no change
//// [/home/src/projects/myproject/types/sometype.ts] no change

