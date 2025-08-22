currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/XY/a.ts]

export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/link] symlink(/user/username/projects/myproject/Xy)

//// [/user/username/projects/myproject/b.ts]

import { a } from "./XY/a";
import { b } from "./link/a";

a;b;


//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "outFile": "out.js",
    "module": "system"
  }
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w --p . --explainFiles --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/b.ts","/user/username/projects/myproject/XY/a.ts"]
  options: {"forceConsistentCasingInFileNames":true,"outFile":"/user/username/projects/myproject/out.js","module":4,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/b.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/XY/a.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/link/a.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
XY/a.ts
  Imported via "./XY/a" from file 'b.ts'
  Matched by default include pattern '**/*'
link/a.ts
  Imported via "./link/a" from file 'b.ts'
b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


//// [/user/username/projects/myproject/out.js]
System.register("XY/a", [], function (exports_1, context_1) {
    "use strict";
    var a, b;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("a", a = 1);
            exports_1("b", b = 2);
        }
    };
});
System.register("link/a", [], function (exports_2, context_2) {
    "use strict";
    var a, b;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("a", a = 1);
            exports_2("b", b = 2);
        }
    };
});
System.register("b", ["XY/a", "link/a"], function (exports_3, context_3) {
    "use strict";
    var a_1, a_2;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            },
            function (a_2_1) {
                a_2 = a_2_1;
            }
        ],
        execute: function () {
            a_1.a;
            a_2.b;
        }
    };
});



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/XY/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/link/a.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/XY/a.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "outFile": "/user/username/projects/myproject/out.js",
  "module": 4,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/XY/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/XY/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/XY/a.ts]
// some comment
                        
export const a = 1;
export const b = 2;



Output::
FileWatcher:: Triggered with /user/username/projects/myproject/XY/a.ts 1:: WatchInfo: /user/username/projects/myproject/XY/a.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/XY/a.ts 1:: WatchInfo: /user/username/projects/myproject/XY/a.ts 250 undefined Source file
FileWatcher:: Triggered with /user/username/projects/myproject/link/a.ts 1:: WatchInfo: /user/username/projects/myproject/link/a.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/link/a.ts 1:: WatchInfo: /user/username/projects/myproject/link/a.ts 250 undefined Source file


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/b.ts","/user/username/projects/myproject/XY/a.ts"]
  options: {"forceConsistentCasingInFileNames":true,"outFile":"/user/username/projects/myproject/out.js","module":4,"watch":true,"project":"/user/username/projects/myproject","explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
XY/a.ts
  Imported via "./XY/a" from file 'b.ts'
  Matched by default include pattern '**/*'
link/a.ts
  Imported via "./link/a" from file 'b.ts'
b.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/out.js]
// some comment
System.register("XY/a", [], function (exports_1, context_1) {
    "use strict";
    var a, b;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {// some comment
            exports_1("a", a = 1);
            exports_1("b", b = 2);
        }
    };
});
// some comment
System.register("link/a", [], function (exports_2, context_2) {
    "use strict";
    var a, b;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {// some comment
            exports_2("a", a = 1);
            exports_2("b", b = 2);
        }
    };
});
System.register("b", ["XY/a", "link/a"], function (exports_3, context_3) {
    "use strict";
    var a_1, a_2;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [
            function (a_1_1) {
                a_1 = a_1_1;
            },
            function (a_2_1) {
                a_2 = a_2_1;
            }
        ],
        execute: function () {
            a_1.a;
            a_2.b;
        }
    };
});




Program root files: [
  "/user/username/projects/myproject/b.ts",
  "/user/username/projects/myproject/XY/a.ts"
]
Program options: {
  "forceConsistentCasingInFileNames": true,
  "outFile": "/user/username/projects/myproject/out.js",
  "module": 4,
  "watch": true,
  "project": "/user/username/projects/myproject",
  "explainFiles": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/XY/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/XY/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
