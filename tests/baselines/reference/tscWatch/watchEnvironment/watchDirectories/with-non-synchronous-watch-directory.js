currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/lib/lib.d.ts] Inode:: 3
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

//// [/user/username/projects/myproject/src/file1.ts] Inode:: 9
import { x } from "file2";

//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] Inode:: 12
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json] Inode:: 13
{}


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js] Inode:: 14
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/file2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts: *new*
  {"inode":3}
/user/username/projects/myproject: *new*
  {"inode":7}
/user/username/projects/myproject/node_modules: *new*
  {"inode":10}
/user/username/projects/myproject/node_modules/file2: *new*
  {"inode":11}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {"inode":12}
/user/username/projects/myproject/src: *new*
  {"inode":8}
/user/username/projects/myproject/src/file1.ts: *new*
  {"inode":9}
/user/username/projects/myproject/tsconfig.json: *new*
  {"inode":13}

Timeout callback:: count: 1
1: timerToUpdateChildWatches *new*

Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/node_modules/file2/index.d.ts (used version)
/user/username/projects/myproject/src/file1.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Directory watch updates because of file1.js creation

Input::

Before running Timeout callback:: count: 1
1: timerToUpdateChildWatches

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined

Change:: Remove directory node_modules

Input::
//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] deleted

Output::
sysLog:: /user/username/projects/myproject/node_modules/file2/index.d.ts:: Changing watcher to MissingFileSystemEntryWatcher
sysLog:: /user/username/projects/myproject/node_modules/file2:: Changing watcher to MissingFileSystemEntryWatcher
sysLog:: /user/username/projects/myproject/node_modules:: Changing watcher to MissingFileSystemEntryWatcher


PolledWatches::
/user/username/projects/myproject/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {"pollingInterval":250}
/user/username/projects/myproject/node_modules/file2/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json:
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}

FsWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"inode":10}
/user/username/projects/myproject/node_modules/file2:
  {"inode":11}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {"inode":12}

Timeout callback:: count: 3
7: timerToInvalidateFailedLookupResolutions *new*
8: timerToUpdateProgram *new*
9: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 3
7: timerToInvalidateFailedLookupResolutions
8: timerToUpdateProgram
9: timerToUpdateChildWatches

Invoking Timeout callback:: timeoutId:: 8:: timerToUpdateProgram
Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js] file written with same contents Inode:: 14

PolledWatches::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {"pollingInterval":250}
/user/username/projects/myproject/node_modules/file2/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json:
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json:
  {"pollingInterval":2000}
/user/username/projects/package.json:
  {"pollingInterval":2000}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}

Timeout callback:: count: 1
7: timerToInvalidateFailedLookupResolutions *deleted*
9: timerToUpdateChildWatches


Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Pending directory watchers and program update

Input::

Before running Timeout callback:: count: 1
9: timerToUpdateChildWatches

After running Timeout callback:: count: 2

Timeout callback:: count: 2
11: timerToInvalidateFailedLookupResolutions *new*
12: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
11: timerToInvalidateFailedLookupResolutions
12: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
12: timerToUpdateProgram *deleted*
13: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
13: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Start npm install

Input::

Output::
sysLog:: /user/username/projects/myproject/node_modules:: Changing watcher to PresentFileSystemEntryWatcher
sysLog:: /user/username/projects/myproject/node_modules:: Changing watcher to PresentFileSystemEntryWatcher


PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/myproject/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/node_modules: *new*
  {"inode":15}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}

Timeout callback:: count: 1
16: timerToUpdateChildWatches *new*


exitCode:: ExitStatus.undefined

Change:: npm install folder creation of file2

Input::

Timeout callback:: count: 1
16: timerToUpdateChildWatches *deleted*
17: timerToUpdateChildWatches *new*


exitCode:: ExitStatus.undefined

Change:: npm install index file in file2

Input::
//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] Inode:: 17
export const x = 10;



exitCode:: ExitStatus.undefined

Change:: Updates the program

Input::

Before running Timeout callback:: count: 1
17: timerToUpdateChildWatches

After running Timeout callback:: count: 2

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/node_modules:
  {"inode":15}
/user/username/projects/myproject/node_modules/file2: *new*
  {"inode":16}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}

Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions *new*
19: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Invalidates module resolution cache

Input::

Before running Timeout callback:: count: 2
18: timerToInvalidateFailedLookupResolutions
19: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 1

Timeout callback:: count: 1
19: timerToUpdateProgram *deleted*
20: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Pending updates

Input::

Before running Timeout callback:: count: 1
20: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js] file written with same contents Inode:: 14

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/myproject/node_modules/file2/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/myproject/package.json: *new*
  {"pollingInterval":2000}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/package.json: *new*
  {"pollingInterval":2000}

PolledWatches *deleted*::
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {"inode":3}
/user/username/projects/myproject:
  {"inode":7}
/user/username/projects/myproject/node_modules:
  {"inode":15}
/user/username/projects/myproject/node_modules/file2:
  {"inode":16}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {"inode":17}
/user/username/projects/myproject/src:
  {"inode":8}
/user/username/projects/myproject/src/file1.ts:
  {"inode":9}
/user/username/projects/myproject/tsconfig.json:
  {"inode":13}


Program root files: [
  "/user/username/projects/myproject/src/file1.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/projects/myproject/tsconfig.json",
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/node_modules/file2/index.d.ts
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/node_modules/file2/index.d.ts (used version)
/user/username/projects/myproject/src/file1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
