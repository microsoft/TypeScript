currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/client/folder1/module1.ts]
export class Module1Class { }

//// [/user/username/projects/myproject/folder2/module2.ts]
import * as M from "folder1/module1";

//// [/user/username/projects/myproject/client/linktofolder2] symlink(/user/username/projects/myproject/folder2)
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "client",
    "paths": {
      "*": [
        "*"
      ]
    }
  },
  "include": [
    "client/**/*",
    "folder2"
  ]
}

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


/a/lib/tsc.js -w -p . --extendedDiagnostics
Output::
[[90m12:00:31 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/client/folder1/module1.ts","/user/username/projects/myproject/client/linktofolder2/module2.ts"]
  options: {"baseUrl":"/user/username/projects/myproject/client","paths":{"*":["*"]},"pathsBasePath":"/user/username/projects/myproject","watch":true,"project":"/user/username/projects/myproject","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client/folder1/module1.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client/linktofolder2/module2.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[[90m12:00:37 AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client 1 undefined Wild card directory
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory


//// [/user/username/projects/myproject/client/folder1/module1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module1Class = void 0;
var Module1Class = /** @class */ (function () {
    function Module1Class() {
    }
    return Module1Class;
}());
exports.Module1Class = Module1Class;


//// [/user/username/projects/myproject/folder2/module2.js]
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
/user/username/projects/myproject/client/folder1/module1.ts: *new*
  {}
/user/username/projects/myproject/client/linktofolder2/module2.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/client: *new*
  {}
/user/username/projects/myproject/folder2: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/client/folder1/module1.ts",
  "/user/username/projects/myproject/client/linktofolder2/module2.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject/client",
  "paths": {
    "*": [
      "*"
    ]
  },
  "pathsBasePath": "/user/username/projects/myproject",
  "watch": true,
  "project": "/user/username/projects/myproject",
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/client/folder1/module1.ts
/user/username/projects/myproject/client/linktofolder2/module2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/client/folder1/module1.ts
/user/username/projects/myproject/client/linktofolder2/module2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/client/folder1/module1.ts (used version)
/user/username/projects/myproject/client/linktofolder2/module2.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Add module3 to folder2

Input::
//// [/user/username/projects/myproject/folder2/module3.ts]
import * as M from "folder1/module1";


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.ts :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.ts :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90m12:00:41 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/client/folder1/module1.ts","/user/username/projects/myproject/client/linktofolder2/module2.ts","/user/username/projects/myproject/client/linktofolder2/module3.ts"]
  options: {"baseUrl":"/user/username/projects/myproject/client","paths":{"*":["*"]},"pathsBasePath":"/user/username/projects/myproject","watch":true,"project":"/user/username/projects/myproject","extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/client/linktofolder2/module3.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.js :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/folder2/module3.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/folder2/module3.js :: WatchInfo: /user/username/projects/myproject/folder2 1 undefined Wild card directory
[[90m12:00:45 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/folder2/module3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/client/folder1/module1.ts:
  {}
/user/username/projects/myproject/client/linktofolder2/module2.ts:
  {}
/user/username/projects/myproject/client/linktofolder2/module3.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject/client:
  {}
/user/username/projects/myproject/folder2:
  {}


Program root files: [
  "/user/username/projects/myproject/client/folder1/module1.ts",
  "/user/username/projects/myproject/client/linktofolder2/module2.ts",
  "/user/username/projects/myproject/client/linktofolder2/module3.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/myproject/client",
  "paths": {
    "*": [
      "*"
    ]
  },
  "pathsBasePath": "/user/username/projects/myproject",
  "watch": true,
  "project": "/user/username/projects/myproject",
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/client/folder1/module1.ts
/user/username/projects/myproject/client/linktofolder2/module2.ts
/user/username/projects/myproject/client/linktofolder2/module3.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/client/linktofolder2/module3.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/client/linktofolder2/module3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
