
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--noCheck --outFile built
//// [/home/src/workspaces/project/a.ts] new file
export const a = "hello
//// [/home/src/workspaces/project/b.ts] new file
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] new file
{
	"compilerOptions": {
		"declaration": true,
	}
}

ExitStatus:: 2

CompilerOptions::{
    "noCheck": true,
    "outFile": "/home/src/workspaces/project/built"
}
Output::
[96ma.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS1002: [0mUnterminated string literal.

[7m1[0m export const a = "hello
[7m [0m [91m                       ~[0m

[96mtsconfig.json[0m:[93m2[0m:[93m2[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m2[0m  "compilerOptions": {
[7m [0m [91m ~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  a.ts[90m:1[0m
     1  tsconfig.json[90m:2[0m

//// [/home/src/workspaces/project/a.d.ts] new file
export declare const a = "hello";

//// [/home/src/workspaces/project/a.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;

//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/b.d.ts] new file
export declare const b = 10;

//// [/home/src/workspaces/project/b.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/workspaces/project/b.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

