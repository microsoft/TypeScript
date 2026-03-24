currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/file1.ts] Inode:: 6
import { x } from "./file2";

//// [/user/username/projects/myproject/src/file2.ts] Inode:: 7
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 8
{
  "compilerOptions": {
    "outDir": "dist"
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts] Inode:: 14
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

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib* Inode:: 16

//// [/user/username/projects/myproject/dist/src/file2.js] Inode:: 124
export const x = 10;


//// [/user/username/projects/myproject/dist/src/file1.js] Inode:: 125
export {};



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {"inode":16}
/user/username/projects/myproject: *new*
  {"inode":4}
/user/username/projects/myproject/dist: *new*
  {"inode":122}
/user/username/projects/myproject/dist/src: *new*
  {"inode":123}
/user/username/projects/myproject/src: *new*
  {"inode":5}
/user/username/projects/myproject/src/file1.ts: *new*
  {"inode":6}
/user/username/projects/myproject/src/file2.ts: *new*
  {"inode":7}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":8}

Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/src/file2.ts
/user/username/projects/myproject/src/file1.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/src/file2.ts (used version)
/user/username/projects/myproject/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: No change

Input::


exitCode:: ExitStatus.undefined

Change:: rename the file

Input::
//// [/user/username/projects/myproject/src/renamed.ts] Inode:: 126
export const x = 10;

//// [/user/username/projects/myproject/src/file2.ts] deleted

Output::
sysLog:: /user/username/projects/myproject/src/file2.ts:: Changing watcher to MissingFileSystemEntryWatcher


PolledWatches::
/user/username/projects/myproject/src/file2.ts: *new*
  {"pollingInterval":250}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {"inode":16}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/dist:
  {"inode":122}
/user/username/projects/myproject/dist/src:
  {"inode":123}
/user/username/projects/myproject/src:
  {"inode":5}
/user/username/projects/myproject/src/file1.ts:
  {"inode":6}
/user/username/projects/myproject/tsconfig.json:
  {"inode":8}

FsWatches *deleted*::
/user/username/projects/myproject/src/file2.ts:
  {"inode":7}

Timeout callback:: count: 2
1: timerToUpdateProgram *new*
3: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 2
1: timerToUpdateProgram
3: timerToUpdateChildWatches

Invoking Timeout callback:: timeoutId:: 1:: timerToUpdateProgram
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS6053: [0mFile '/user/username/projects/myproject/src/file2.ts' not found.
  The file is in the program because:
    Matched by default include pattern '**/*'

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.



//// [/user/username/projects/myproject/dist/src/file1.js] file written with same contents Inode:: 125

PolledWatches::
/user/username/projects/myproject/src/file2.ts:
  {"pollingInterval":500} *new*

PolledWatches *deleted*::
/user/username/projects/myproject/src/file2.ts:
  {"pollingInterval":250}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {"inode":16}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/dist:
  {"inode":122}
/user/username/projects/myproject/dist/src:
  {"inode":123}
/user/username/projects/myproject/src:
  {"inode":5}
/user/username/projects/myproject/src/file1.ts:
  {"inode":6}
/user/username/projects/myproject/tsconfig.json:
  {"inode":8}


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/file2.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/src/file1.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Pending directory watchers and program update

Input::

Before running Timeout callback:: count: 1
3: timerToUpdateChildWatches

After running Timeout callback:: count: 2

Timeout callback:: count: 2
5: timerToUpdateProgram *new*
7: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
5: timerToUpdateProgram
7: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m3[0m     "outDir": "dist"
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/dist/src/renamed.js] Inode:: 127
export const x = 10;



PolledWatches *deleted*::
/user/username/projects/myproject/src/file2.ts:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts:
  {"inode":16}
/user/username/projects/myproject:
  {"inode":4}
/user/username/projects/myproject/dist:
  {"inode":122}
/user/username/projects/myproject/dist/src:
  {"inode":123}
/user/username/projects/myproject/src:
  {"inode":5}
/user/username/projects/myproject/src/file1.ts:
  {"inode":6}
/user/username/projects/myproject/src/renamed.ts: *new*
  {"inode":126}
/user/username/projects/myproject/tsconfig.json:
  {"inode":8}

Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *deleted*
8: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 1
8: timerToUpdateChildWatches

After running Timeout callback:: count: 0


Program root files: [
  "/user/username/projects/myproject/src/file1.ts",
  "/user/username/projects/myproject/src/renamed.ts"
]
Program options: {
  "outDir": "/user/username/projects/myproject/dist",
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/src/file1.ts
/user/username/projects/myproject/src/renamed.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/renamed.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
