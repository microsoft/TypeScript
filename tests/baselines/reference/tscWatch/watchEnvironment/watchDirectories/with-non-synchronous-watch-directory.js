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



Program root files: ["/user/username/projects/myproject/src/file1.ts"]
Program options: {"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/file1.js]
"use strict";
exports.__esModule = true;



Change:: Directory watch updates because of file1.js creation

Input::

Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Remove directory node_modules

Input::
//// [/user/username/projects/myproject/node_modules/file2/index.d.ts] deleted

Output::
>> Screen clear
[[90m12:00:36 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90m12:00:40 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/file1.ts"]
Program options: {"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/src/file1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/src/file1.ts (computed .d.ts)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/file1.js] file written with same contents

Change:: Pending directory watchers and program update

Input::

Output::
>> Screen clear
[[90m12:00:41 AM[0m] File change detected. Starting incremental compilation...

[96muser/username/projects/myproject/src/file1.ts[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2307: [0mCannot find module 'file2' or its corresponding type declarations.

[7m1[0m import { x } from "file2";
[7m [0m [91m                  ~~~~~~~[0m

[[90m12:00:42 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/file1.ts"]
Program options: {"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/src/file1.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Start npm install

Input::

Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: npm install folder creation of file2

Input::

Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: npm install index file in file2

Input::
//// [/user/username/projects/myproject/node_modules/file2/index.d.ts]
export const x = 10;


Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Updates the program

Input::

Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Invalidates module resolution cache

Input::

Output::

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: Pending updates

Input::

Output::
>> Screen clear
[[90m12:00:50 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:54 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/file1.ts"]
Program options: {"watch":true,"project":"/user/username/projects/myproject/tsconfig.json","configFilePath":"/user/username/projects/myproject/tsconfig.json"}
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

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/src/file1.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/src:
  {}
/user/username/projects/myproject/node_modules:
  {}
/user/username/projects/myproject:
  {}
/user/username/projects/myproject/node_modules/file2:
  {}
/user/username/projects/myproject/node_modules/file2/index.d.ts:
  {}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/file1.js] file written with same contents
