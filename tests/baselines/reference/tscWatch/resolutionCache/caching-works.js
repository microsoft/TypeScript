Input::
//// [/a/d/f0.ts]
import {x} from "f1"

//// [/a/f1.ts]
foo()

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


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

/a/lib/tsc.js --w /a/d/f0.ts
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/a/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96ma/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:20 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/a/d/f0.ts"]
Program options: {"module":2}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/f1.ts
/a/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/f1.ts
/a/d/f0.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/f1.ts (used version)
/a/d/f0.ts (used version)

WatchedFiles::
/a/d/f0.ts:
  {"fileName":"/a/d/f0.ts","pollingInterval":250}
/a/f1.ts:
  {"fileName":"/a/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/f1.js]
foo();


//// [/a/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});



fileExists:: {
 "/a/d/f1.ts": 1,
 "/a/d/f1.tsx": 1,
 "/a/d/f1.d.ts": 1,
 "/a/f1.ts": 1
} 

directoryExists:: {
 "/a/d": 1,
 "/a": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Adding text doesnt re-resole the imports

Input::
//// [/a/d/f0.ts]
import {x} from "f1"
                            var x: string = 1;


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:24 AM[0m] File change detected. Starting incremental compilation...

[96ma/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/a/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96ma/d/f0.ts[0m:[93m2[0m:[93m33[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m                             var x: string = 1;
[7m [0m [91m                                ~[0m

[96ma/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:28 AM[0m] Found 3 errors. Watching for file changes.



Program root files: ["/a/d/f0.ts"]
Program options: {"module":2}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/f1.ts
/a/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/d/f0.ts

Shape signatures in builder refreshed for::
/a/d/f0.ts (computed .d.ts)

WatchedFiles::
/a/d/f0.ts:
  {"fileName":"/a/d/f0.ts","pollingInterval":250}
/a/f1.ts:
  {"fileName":"/a/f1.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var x = 1;
});



fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Resolves f2

Input::
//// [/a/d/f0.ts]
import {x} from "f2"


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[96ma/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'f2'. Did you mean to set the 'moduleResolution' option to 'node', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "f2"
[7m [0m [91m                ~~~~[0m

[[90m12:00:36 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/a/d/f0.ts"]
Program options: {"module":2}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/d/f0.ts

Shape signatures in builder refreshed for::
/a/d/f0.ts (computed .d.ts)

WatchedFiles::
/a/d/f0.ts:
  {"fileName":"/a/d/f0.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/node_modules:
  {"directoryName":"/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});



fileExists:: {
 "/a/d/f2.ts": 1,
 "/a/d/f2.tsx": 1,
 "/a/d/f2.d.ts": 1,
 "/a/f2.ts": 1,
 "/a/f2.tsx": 1,
 "/a/f2.d.ts": 1,
 "/f2.ts": 1,
 "/f2.tsx": 1,
 "/f2.d.ts": 1,
 "/a/d/f2.js": 1,
 "/a/d/f2.jsx": 1,
 "/a/f2.js": 1,
 "/a/f2.jsx": 1,
 "/f2.js": 1,
 "/f2.jsx": 1
} 

directoryExists:: {
 "/a/d": 2,
 "/a": 2,
 "/": 2,
 "/a/d/node_modules": 1,
 "/a/node_modules": 1,
 "/node_modules": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Change:: Resolve f1

Input::
//// [/a/d/f0.ts]
import {x} from "f1"


fileExists:: {} 

directoryExists:: {} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 

Output::
>> Screen clear
[[90m12:00:40 AM[0m] File change detected. Starting incremental compilation...

[96ma/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/a/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96ma/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:47 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/a/d/f0.ts"]
Program options: {"module":2}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/a/f1.ts
/a/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/f1.ts
/a/d/f0.ts

Shape signatures in builder refreshed for::
/a/f1.ts (computed .d.ts)
/a/d/f0.ts (computed .d.ts)

WatchedFiles::
/a/d/f0.ts:
  {"fileName":"/a/d/f0.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/a/f1.ts:
  {"fileName":"/a/f1.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/a:
  {"directoryName":"/a","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/a/f1.js] file written with same contents
//// [/a/d/f0.js] file written with same contents

fileExists:: {
 "/a/d/f1.ts": 1,
 "/a/d/f1.tsx": 1,
 "/a/d/f1.d.ts": 1,
 "/a/f1.ts": 1
} 

directoryExists:: {
 "/a/d": 1,
 "/a": 1,
 "/node_modules/@types": 1
} 

getModifiedTimes:: {} 

setModifiedTimes:: {} 
