currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/project/commonFile1.ts] Inode:: 5
let x = 1

//// [/user/username/projects/project/commonFile2.ts] Inode:: 6
let y = 1

//// [/user/username/projects/project/tsconfig.json] Inode:: 7
{
  "watchOptions": {
    "fallbackPolling": "PriorityInterval"
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 13
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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

sysLog:: /user/username/projects/project/tsconfig.json:: Changing to watchFile
sysLog:: /user/username/projects/project/commonFile1.ts:: Changing to watchFile
sysLog:: /user/username/projects/project/commonFile2.ts:: Changing to watchFile
sysLog:: /home/src/tslibs/TS/Lib/lib.d.ts:: Changing to watchFile
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

sysLog:: /user/username/projects/project:: Changing to watchFile


//// [/user/username/projects/project/commonFile1.js] Inode:: 111
var x = 1;


//// [/user/username/projects/project/commonFile2.js] Inode:: 112
var y = 1;



PolledWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {"pollingInterval":250}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project: *new*
  {"pollingInterval":500}
/user/username/projects/project/commonFile1.ts: *new*
  {"pollingInterval":250}
/user/username/projects/project/commonFile2.ts: *new*
  {"pollingInterval":250}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/tsconfig.json: *new*
  {"pollingInterval":2000}

Program root files: [
  "/user/username/projects/project/commonFile1.ts",
  "/user/username/projects/project/commonFile2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/commonfile1.ts (used version)
/user/username/projects/project/commonfile2.ts (used version)

exitCode:: ExitStatus.undefined
