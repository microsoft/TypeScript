currentDirectory:: /user/username/projects/project useCaseSensitiveFileNames: false
Input::
//// [/home/src/tslibs/ts/lib/lib.d.ts] Inode:: 6
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

//// [/user/username/projects/project/commonFile1.ts] Inode:: 11
let x = 1

//// [/user/username/projects/project/commonFile2.ts] Inode:: 12
let y = 1

//// [/user/username/projects/project/tsconfig.json] Inode:: 13
{
  "watchOptions": {
    "watchDirectory": "UseFsEvents"
  }
}


/home/src/tslibs/ts/lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/project/commonFile1.js] Inode:: 14
var x = 1;


//// [/user/username/projects/project/commonFile2.js] Inode:: 15
var y = 1;



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/ts/lib/lib.d.ts: *new*
  {"inode":6}
/user/username/projects/project: *new*
  {"inode":10}
/user/username/projects/project/commonFile1.ts: *new*
  {"inode":11}
/user/username/projects/project/commonFile2.ts: *new*
  {"inode":12}
/user/username/projects/project/tsconfig.json: *new*
  {"inode":13}

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
/home/src/tslibs/ts/lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/user/username/projects/project/commonFile1.ts
/user/username/projects/project/commonFile2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/project/commonfile1.ts (used version)
/user/username/projects/project/commonfile2.ts (used version)

exitCode:: ExitStatus.undefined
