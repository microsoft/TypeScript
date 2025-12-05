currentDirectory:: /home/src/projects/a/rootFolder/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/rootFolder/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "allowJs": true,
    "outDir": "Static/scripts/"
  },
  "include": [
    "Scripts/**/*"
  ]
}

//// [/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts]
var z = 10;

//// [/home/src/projects/a/rootFolder/project/Scripts/Javascript.js]
var zz = 10;

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/rootFolder/project/Static/scripts/Javascript.js]
var zz = 10;


//// [/home/src/projects/a/rootFolder/project/Static/scripts/TypeScript.js]
var z = 10;



PolledWatches::
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/rootFolder/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/rootFolder/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/rootFolder/project/Scripts/Javascript.js: *new*
  {}
/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts: *new*
  {}
/home/src/projects/a/rootFolder/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/rootFolder/project/Scripts: *new*
  {}

Program root files: [
  "/home/src/projects/a/rootFolder/project/Scripts/Javascript.js",
  "/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts"
]
Program options: {
  "module": 0,
  "allowJs": true,
  "outDir": "/home/src/projects/a/rootFolder/project/Static/scripts",
  "watch": true,
  "configFilePath": "/home/src/projects/a/rootFolder/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/rootFolder/project/Scripts/Javascript.js
/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/rootfolder/project/scripts/javascript.js (used version)
/home/src/projects/a/rootfolder/project/scripts/typescript.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify typescript file

Input::
//// [/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts]
var zz30 = 100;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/a/rootFolder/project/Static/scripts/Javascript.js] file written with same contents
//// [/home/src/projects/a/rootFolder/project/Static/scripts/TypeScript.js]
var zz30 = 100;




Program root files: [
  "/home/src/projects/a/rootFolder/project/Scripts/Javascript.js",
  "/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts"
]
Program options: {
  "module": 0,
  "allowJs": true,
  "outDir": "/home/src/projects/a/rootFolder/project/Static/scripts",
  "watch": true,
  "configFilePath": "/home/src/projects/a/rootFolder/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/rootFolder/project/Scripts/Javascript.js
/home/src/projects/a/rootFolder/project/Scripts/TypeScript.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/a/rootfolder/project/scripts/typescript.ts (computed .d.ts)
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/a/rootfolder/project/scripts/javascript.js (computed .d.ts)

exitCode:: ExitStatus.undefined
