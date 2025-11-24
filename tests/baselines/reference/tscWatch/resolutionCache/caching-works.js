currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/users/username/projects/project/d/f0.ts]
import {x} from "f1"

//// [/users/username/projects/project/f1.ts]
foo()

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --w /users/username/projects/project/d/f0.ts
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/f1.js]
foo();


//// [/users/username/projects/project/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



PolledWatches::
/users/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/users/username/projects/project/d/f0.ts: *new*
  {}
/users/username/projects/project/f1.ts: *new*
  {}

FsWatchesRecursive::
/users/username/projects/project/d: *new*
  {}

Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
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

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



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
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

No cached semantic diagnostics in the builder::

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

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/d/f0.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});



PolledWatches::
/users/username/projects/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules: *new*
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects: *new*
  {}
/users/username/projects/project: *new*
  {}
/users/username/projects/project/d/f0.ts:
  {}

FsWatches *deleted*::
/users/username/projects/project/f1.ts:
  {}

FsWatchesRecursive::
/users/username/projects/project/d:
  {}


Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/d/f0.ts

No cached semantic diagnostics in the builder::

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

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS5107: [0mOption 'module=AMD' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/users/username/projects/project/f1.js] file written with same contents
//// [/users/username/projects/project/d/f0.js] file written with same contents

PolledWatches::
/users/username/projects/node_modules/@types:
  {"pollingInterval":500}
/users/username/projects/project/node_modules/@types:
  {"pollingInterval":500}

PolledWatches *deleted*::
/users/username/projects/node_modules:
  {"pollingInterval":500}
/users/username/projects/project/node_modules:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/users/username/projects/project/d/f0.ts:
  {}
/users/username/projects/project/f1.ts: *new*
  {}

FsWatches *deleted*::
/users/username/projects:
  {}
/users/username/projects/project:
  {}

FsWatchesRecursive::
/users/username/projects/project/d:
  {}


Program root files: [
  "/users/username/projects/project/d/f0.ts"
]
Program options: {
  "module": 2
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/users/username/projects/project/f1.ts
/users/username/projects/project/d/f0.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/users/username/projects/project/f1.ts (computed .d.ts)
/users/username/projects/project/d/f0.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
