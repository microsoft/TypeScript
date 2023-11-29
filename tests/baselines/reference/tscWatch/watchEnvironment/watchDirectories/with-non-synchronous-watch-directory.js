currentDirectory:: / useCaseSensitiveFileNames: false
Input::
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

//// [/user/username/projects/myproject/src/file1.ts]
import { x } from "file2";

//// [/user/username/projects/myproject/node_modules/file2/index.d.ts]
export const x = 10;

//// [/user/username/projects/myproject/tsconfig.json]
{}


/a/lib/tsc.js --w -p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/node_modules: *new*
  {}
/user/username/projects/myproject/node_modules/file2: *new*
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}
/user/username/projects/myproject/src/file1.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

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

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/node_modules/file2:
  {}

Timeout callback:: count: 3
7: timerToInvalidateFailedLookupResolutions *new*
8: timerToUpdateProgram *new*
9: timerToUpdateChildWatches *new*

Before running Timeout callback:: count: 3
7: timerToInvalidateFailedLookupResolutions
8: timerToUpdateProgram
9: timerToUpdateChildWatches

Invoking Timeout callback:: timeoutId:: 8:: timerToUpdateProgram
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90m12:00:36 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90m12:00:40 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js] file written with same contents

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}

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

After running Timeout callback:: count: 1

Timeout callback:: count: 1
12: timerToUpdateProgram *deleted*
13: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
13: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:41 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90m12:00:42 AM[0m] Found 1 error. Watching for file changes.





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

Timeout callback:: count: 1
15: timerToUpdateChildWatches *new*


exitCode:: ExitStatus.undefined

Change:: npm install folder creation of file2

Input::

Timeout callback:: count: 1
15: timerToUpdateChildWatches *deleted*
16: timerToUpdateChildWatches *new*


exitCode:: ExitStatus.undefined

Change:: npm install index file in file2

Input::
//// [/user/username/projects/myproject/node_modules/file2/index.d.ts]
export const x = 10;



exitCode:: ExitStatus.undefined

Change:: Updates the program

Input::

Before running Timeout callback:: count: 1
16: timerToUpdateChildWatches

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
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2: *new*
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

Timeout callback:: count: 2
17: timerToInvalidateFailedLookupResolutions *new*
18: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Invalidates module resolution cache

Input::

Before running Timeout callback:: count: 2
17: timerToInvalidateFailedLookupResolutions
18: timerToUpdateProgram

After running Timeout callback:: count: 1

Timeout callback:: count: 1
18: timerToUpdateProgram *deleted*
19: timerToUpdateProgram *new*


exitCode:: ExitStatus.undefined

Change:: Pending updates

Input::

Before running Timeout callback:: count: 1
19: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:50 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:54 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/src/file1.js] file written with same contents

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/user/username/projects/node_modules:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts: *new*
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}


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
