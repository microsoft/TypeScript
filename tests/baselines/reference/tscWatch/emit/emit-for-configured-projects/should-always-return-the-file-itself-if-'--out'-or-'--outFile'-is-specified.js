currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/moduleFile1.ts]
export function Foo() { };

//// [/a/b/file1Consumer1.ts]
import {Foo} from "./moduleFile1"; export var y = 10;

//// [/a/b/file1Consumer2.ts]
import {Foo} from "./moduleFile1"; let z = 10;

//// [/a/b/globalFile3.ts]
interface GlobalFoo { age: number }

//// [/a/b/moduleFile2.ts]
export var Foo4 = 10;

//// [/a/b/tsconfig.json]
{
  "compilerOptions": {
    "module": "system",
    "outFile": "/a/b/out.js"
  }
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


/a/lib/tsc.js --w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/out.js]
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



FsWatches::
/a/b/file1Consumer1.ts: *new*
  {}
/a/b/file1Consumer2.ts: *new*
  {}
/a/b/globalFile3.ts: *new*
  {}
/a/b/moduleFile1.ts: *new*
  {}
/a/b/moduleFile2.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/file1Consumer1.ts",
  "/a/b/file1Consumer2.ts",
  "/a/b/globalFile3.ts",
  "/a/b/moduleFile1.ts",
  "/a/b/moduleFile2.ts"
]
Program options: {
  "module": 4,
  "outFile": "/a/b/out.js",
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Change the content of moduleFile1 to `export var T: number;export function Foo() { };`

Input::
//// [/a/b/moduleFile1.ts]
export var T: number;export function Foo() { };


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/out.js]
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
  "/a/b/file1Consumer1.ts",
  "/a/b/file1Consumer2.ts",
  "/a/b/globalFile3.ts",
  "/a/b/moduleFile1.ts",
  "/a/b/moduleFile2.ts"
]
Program options: {
  "module": 4,
  "outFile": "/a/b/out.js",
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/moduleFile1.ts
/a/b/file1Consumer1.ts
/a/b/file1Consumer2.ts
/a/b/globalFile3.ts
/a/b/moduleFile2.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
