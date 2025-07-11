
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::-w
//// [/home/src/workspaces/project/a.ts] new file
const a: number = "hello"
//// [/home/src/workspaces/project/tsconfig.json] new file
{
	"compilerOptions": {
            "noEmit": true,
            "outFile": "../outFile.js"
	}
}



CompilerOptions::{
    "watch": true
}


Output::
[96mtsconfig.json[0m:[93m4[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m4[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change



Edit:: fix syntax error

Output::
[96mtsconfig.json[0m:[93m4[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m4[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

//// [/home/src/workspaces/project/a.ts] modified. new content:
const a = "hello";
//// [/home/src/workspaces/project/tsconfig.json] no change



Edit:: emit after fixing error

Output::
[96mtsconfig.json[0m:[93m3[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m3[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/a.js] new file
const a = "hello";

//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] modified. new content:
{
	"compilerOptions": {
            "outFile": "../outFile.js"
	}
}



Edit:: no emit run after fixing error

Output::
[96mtsconfig.json[0m:[93m4[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m4[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

//// [/home/src/workspaces/project/a.js] no change
//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] modified. new content:
{
	"compilerOptions": {
            "noEmit": true,
            "outFile": "../outFile.js"
	}
}



Edit:: introduce error

Output::
[96mtsconfig.json[0m:[93m4[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m4[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

//// [/home/src/workspaces/project/a.js] no change
//// [/home/src/workspaces/project/a.ts] modified. new content:
const a: number = "hello"
//// [/home/src/workspaces/project/tsconfig.json] no change



Edit:: emit when error

Output::
[96mtsconfig.json[0m:[93m3[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m3[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:3[0m

//// [/home/src/workspaces/project/a.js] no change
//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] modified. new content:
{
	"compilerOptions": {
            "outFile": "../outFile.js"
	}
}



Edit:: no emit run when error

Output::
[96mtsconfig.json[0m:[93m4[0m:[93m13[0m - [91merror[0m[90m TS5102: [0mOption 'outFile' has been removed. Please remove it from your configuration.

[7m4[0m             "outFile": "../outFile.js"
[7m [0m [91m            ~~~~~~~~~[0m


Found 1 error in tsconfig.json[90m:4[0m

//// [/home/src/workspaces/project/a.js] no change
//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] modified. new content:
{
	"compilerOptions": {
            "noEmit": true,
            "outFile": "../outFile.js"
	}
}

