currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/XY/a.ts]

export const a = 1;
export const b = 2;


//// [/user/username/projects/myproject/link] symlink(/user/username/projects/myproject/XY)
//// [/user/username/projects/myproject/b.ts]

import { a } from "./Xy/a";
import { b } from "./link/a";

a;b;


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

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "outFile": "out.js",
    "module": "system"
  }
}


/a/lib/tsc.js --w --p . --explainFiles
Output::
>> Screen clear
[[90m12:00:27 AM[0m] Starting compilation in watch mode...

[96mb.ts[0m:[93m2[0m:[93m19[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/Xy/a.ts' differs from file name '/user/username/projects/myproject/XY/a.ts' only in casing.
  The file is in the program because:
    Imported via "./Xy/a" from file '/user/username/projects/myproject/b.ts'
    Matched by default include pattern '**/*'

[7m2[0m import { a } from "./Xy/a";
[7m [0m [91m                  ~~~~~~~~[0m

../../../../a/lib/lib.d.ts
  Default library for target 'es5'
Xy/a.ts
  Imported via "./Xy/a" from file 'b.ts'
  Matched by default include pattern '**/*'
link/a.ts
  Imported via "./link/a" from file 'b.ts'
b.ts
  Matched by default include pattern '**/*'
[[90m12:00:30 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/out.js]
System.register("Xy/a", [], function (exports_1, context_1) {
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
System.register("b", ["Xy/a", "link/a"], function (exports_3, context_3) {
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
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/Xy/a.ts: *new*
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
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Xy/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Prepend a line to moduleA

Input::
//// [/user/username/projects/myproject/XY/a.ts]
// some comment
                        
export const a = 1;
export const b = 2;



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[96mb.ts[0m:[93m2[0m:[93m19[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/user/username/projects/myproject/Xy/a.ts' differs from file name '/user/username/projects/myproject/XY/a.ts' only in casing.
  The file is in the program because:
    Imported via "./Xy/a" from file '/user/username/projects/myproject/b.ts'
    Matched by default include pattern '**/*'

[7m2[0m import { a } from "./Xy/a";
[7m [0m [91m                  ~~~~~~~~[0m

../../../../a/lib/lib.d.ts
  Default library for target 'es5'
Xy/a.ts
  Imported via "./Xy/a" from file 'b.ts'
  Matched by default include pattern '**/*'
link/a.ts
  Imported via "./link/a" from file 'b.ts'
b.ts
  Matched by default include pattern '**/*'
[[90m12:00:37 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/out.js]
// some comment
System.register("Xy/a", [], function (exports_1, context_1) {
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
System.register("b", ["Xy/a", "link/a"], function (exports_3, context_3) {
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
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/Xy/a.ts
/user/username/projects/myproject/link/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
