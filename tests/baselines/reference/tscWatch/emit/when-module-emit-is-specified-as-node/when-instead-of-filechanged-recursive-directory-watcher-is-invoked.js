currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/rootFolder/project/tsconfig.json]
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

//// [/a/rootFolder/project/Scripts/TypeScript.ts]
var z = 10;

//// [/a/rootFolder/project/Scripts/Javascript.js]
var zz = 10;

//// [/a/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
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


/a/lib/tsc.js --w --p /a/rootFolder/project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:31 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/rootFolder/project/Static/scripts/Javascript.js]
var zz = 10;


//// [/a/rootFolder/project/Static/scripts/TypeScript.js]
var z = 10;



PolledWatches::
/a/rootFolder/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/a/rootFolder/project/Scripts/Javascript.js: *new*
  {}
/a/rootFolder/project/Scripts/TypeScript.ts: *new*
  {}
/a/rootFolder/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/rootFolder/project/Scripts: *new*
  {}

Program root files: [
  "/a/rootFolder/project/Scripts/Javascript.js",
  "/a/rootFolder/project/Scripts/TypeScript.ts"
]
Program options: {
  "module": 0,
  "allowJs": true,
  "outDir": "/a/rootFolder/project/Static/scripts",
  "watch": true,
  "project": "/a/rootFolder/project/tsconfig.json",
  "configFilePath": "/a/rootFolder/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/rootFolder/project/Scripts/Javascript.js
/a/rootFolder/project/Scripts/TypeScript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/rootFolder/project/Scripts/Javascript.js
/a/rootFolder/project/Scripts/TypeScript.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/rootfolder/project/scripts/javascript.js (used version)
/a/rootfolder/project/scripts/typescript.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify typescript file

Input::
//// [/a/rootFolder/project/Scripts/TypeScript.ts]
var zz30 = 100;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:34 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:41 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/rootFolder/project/Static/scripts/Javascript.js] file written with same contents
//// [/a/rootFolder/project/Static/scripts/TypeScript.js]
var zz30 = 100;




Program root files: [
  "/a/rootFolder/project/Scripts/Javascript.js",
  "/a/rootFolder/project/Scripts/TypeScript.ts"
]
Program options: {
  "module": 0,
  "allowJs": true,
  "outDir": "/a/rootFolder/project/Static/scripts",
  "watch": true,
  "project": "/a/rootFolder/project/tsconfig.json",
  "configFilePath": "/a/rootFolder/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/rootFolder/project/Scripts/Javascript.js
/a/rootFolder/project/Scripts/TypeScript.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/rootFolder/project/Scripts/Javascript.js
/a/rootFolder/project/Scripts/TypeScript.ts

Shape signatures in builder refreshed for::
/a/rootfolder/project/scripts/typescript.ts (computed .d.ts)
/a/rootfolder/project/scripts/javascript.js (computed .d.ts)

exitCode:: ExitStatus.undefined
