currentDirectory:: /home/src/projects/a/b useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export function Foo() { };

//// [/home/src/projects/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/home/src/projects/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/home/src/projects/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/home/src/projects/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/home/src/projects/a/b/tsconfig.json]
{
  "compilerOptions": {
    "module": "system",
    "outFile": "/home/src/projects/a/b/out.js"
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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/out.js]
System.register("moduleFile1", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function Foo() { }
    exports_1("Foo", Foo);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("file1Consumer1", [], function (exports_2, context_2) {
    "use strict";
    var y;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("y", y = 10);
        }
    };
});
System.register("file1Consumer2", [], function (exports_3, context_3) {
    "use strict";
    var z;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            z = 10;
        }
    };
});
System.register("moduleFile2", [], function (exports_4, context_4) {
    "use strict";
    var Foo4;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("Foo4", Foo4 = 10);
        }
    };
});



PolledWatches::
/home/src/projects/a/b/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/a/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/a/b/file1Consumer1.ts: *new*
  {}
/home/src/projects/a/b/file1Consumer2.ts: *new*
  {}
/home/src/projects/a/b/globalFile3.ts: *new*
  {}
/home/src/projects/a/b/moduleFile1.ts: *new*
  {}
/home/src/projects/a/b/moduleFile2.ts: *new*
  {}
/home/src/projects/a/b/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/a/b: *new*
  {}

Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
]
Program options: {
  "module": 4,
  "outFile": "/home/src/projects/a/b/out.js",
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

Input::
//// [/home/src/projects/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/a/b/out.js]
System.register("moduleFile1", [], function (exports_1, context_1) {
    "use strict";
    var T;
    var __moduleName = context_1 && context_1.id;
    function Foo() { }
    exports_1("Foo", Foo);
    return {
        setters: [],
        execute: function () {
            ;
        }
    };
});
System.register("file1Consumer1", [], function (exports_2, context_2) {
    "use strict";
    var y;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            exports_2("y", y = 10);
        }
    };
});
System.register("file1Consumer2", [], function (exports_3, context_3) {
    "use strict";
    var z;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            z = 10;
        }
    };
});
System.register("moduleFile2", [], function (exports_4, context_4) {
    "use strict";
    var Foo4;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            exports_4("Foo4", Foo4 = 10);
        }
    };
});




Program root files: [
  "/home/src/projects/a/b/file1Consumer1.ts",
  "/home/src/projects/a/b/file1Consumer2.ts",
  "/home/src/projects/a/b/globalFile3.ts",
  "/home/src/projects/a/b/moduleFile1.ts",
  "/home/src/projects/a/b/moduleFile2.ts"
]
Program options: {
  "module": 4,
  "outFile": "/home/src/projects/a/b/out.js",
  "watch": true,
  "configFilePath": "/home/src/projects/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/a/b/moduleFile1.ts
/home/src/projects/a/b/file1Consumer1.ts
/home/src/projects/a/b/file1Consumer2.ts
/home/src/projects/a/b/globalFile3.ts
/home/src/projects/a/b/moduleFile2.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
