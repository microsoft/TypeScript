currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/file1.ts] Inode:: 6
import { x } from "file2";

//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] Inode:: 9
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 10
{
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 16
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

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist",
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib* Inode:: 18

//// [/user/username/projects/myproject/dist/src/file1.js] Inode:: 126
export {};


//// [/user/username/projects/myproject/dist/src/file1.d.ts] Inode:: 127
export {};



PolledWatches::
/user/username/projects/myproject/node_modules/file2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {"inode":18}
/user/username/projects: *new*
  {"inode":3}
/user/username/projects/myproject: *new*
  {"inode":4}
/user/username/projects/myproject/dist: *new*
  {"inode":124}
/user/username/projects/myproject/dist/src: *new*
  {"inode":125}
/user/username/projects/myproject/node_modules: *new*
  {"inode":7}
/user/username/projects/myproject/node_modules/file2: *new*
  {"inode":8}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {"inode":9}
/user/username/projects/myproject/src: *new*
  {"inode":5}
/user/username/projects/myproject/src/file1.ts: *new*
  {"inode":6}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":10}

Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/node_modules/file2/index.d.ts (used version)
/user/username/projects/myproject/src/file1.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: Add new file, should schedule and run timeout to update directory watcher

Input::
//// [/user/username/projects/myproject/src/file3.ts] Inode:: 128
export const y = 10;


Timeout callback:: count: 1
1: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
1: timerToUpdateChildWatches

Host is moving to new time
After running Timeout callback:: count: 2

Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions *new*
3: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Actual program update to include new file

Input::

Before running Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist",
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/dist/src/file3.js] Inode:: 129
export const y = 10;


//// [/user/username/projects/myproject/dist/src/file3.d.ts] Inode:: 130
export declare const y = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/file2/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json:
  {"pollingInterval":2000}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {"inode":18}
/user/username/projects:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/dist:
  {"inode":124}
/user/username/projects/myproject/dist/src:
  {"inode":125}
/user/username/projects/myproject/node_modules:
  {"inode":7}
/user/username/projects/myproject/node_modules/file2:
  {"inode":8}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {"inode":9}
/user/username/projects/myproject/src:
  {"inode":5}
/user/username/projects/myproject/src/file1.ts:
  {"inode":6}
/user/username/projects/myproject/src/file3.ts: *new*
  {"inode":128}
/user/username/projects/myproject/tsconfig.json:
  {"inode":10}

Timeout callback:: count: 1
5: timerToUpdateChildWatches *new*


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file3.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "declaration": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts
/user/username/projects/myproject/src/file3.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: After program emit with new file, should schedule and run timeout to update directory watcher

Input::

Before running Timeout callback:: count: 1
5: timerToUpdateChildWatches

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined
