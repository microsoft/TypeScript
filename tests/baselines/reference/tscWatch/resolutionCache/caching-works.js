currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/users/username/projects/project/d/f0.ts]
import {x} from "f1"

//// [/users/username/projects/project/f1.ts]
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


/a/lib/tsc.js --w /users/username/projects/project/d/f0.ts
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[96musers/username/projects/project/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/users/username/projects/project/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96musers/username/projects/project/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:28 AM[0m] Found 2 errors. Watching for file changes.



//// [/users/username/projects/project/f1.js]
foo();


//// [/users/username/projects/project/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/users/username/projects/project/d/f0.ts: *new*
  {}
/users/username/projects/project/f1.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects: *new*
  {}

Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/f1.ts (used version)
/users/username/projects/project/d/f0.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Adding text doesnt re-resole the imports

Input::
//// [/users/username/projects/project/d/f0.ts]
import {x} from "f1"
                            var x: string = 1;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[96musers/username/projects/project/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/users/username/projects/project/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96musers/username/projects/project/d/f0.ts[0m:[93m2[0m:[93m33[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m                             var x: string = 1;
[7m [0m [91m                                ~[0m

[96musers/username/projects/project/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:36 AM[0m] Found 3 errors. Watching for file changes.



//// [/users/username/projects/project/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var x = 1;
});




Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/d/f0.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/d/f0.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Resolves f2

Input::
//// [/users/username/projects/project/d/f0.ts]
import {x} from "f2"


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:40 AM[0m] File change detected. Starting incremental compilation...

[96musers/username/projects/project/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2792: [0mCannot find module 'f2'. Did you mean to set the 'moduleResolution' option to 'nodenext', or to add aliases to the 'paths' option?

[7m1[0m import {x} from "f2"
[7m [0m [91m                ~~~~[0m

[[90m12:00:44 AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/d/f0.ts:
  {}

FsWatches *deleted*::
/users/username/projects/project/f1.ts:
  {}

FsWatchesRecursive::
/users/username/projects:
  {}


Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/d/f0.ts

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/d/f0.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/d/f0.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Resolve f1

Input::
//// [/users/username/projects/project/d/f0.ts]
import {x} from "f1"


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:48 AM[0m] File change detected. Starting incremental compilation...

[96musers/username/projects/project/d/f0.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2306: [0mFile '/users/username/projects/project/f1.ts' is not a module.

[7m1[0m import {x} from "f1"
[7m [0m [91m                ~~~~[0m

[96musers/username/projects/project/f1.ts[0m:[93m1[0m:[93m1[0m - [91merror[0m[90m TS2304: [0mCannot find name 'foo'.

[7m1[0m foo()
[7m [0m [91m~~~[0m

[[90m12:00:55 AM[0m] Found 2 errors. Watching for file changes.



//// [/users/username/projects/project/f1.js] file written with same contents
//// [/users/username/projects/project/d/f0.js] file written with same contents

FsWatches::
/a/lib/lib.d.ts:
  {}
/users/username/projects/project/d/f0.ts:
  {}
/users/username/projects/project/f1.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects:
  {}


Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/f1.ts (computed .d.ts)
/users/username/projects/project/d/f0.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
