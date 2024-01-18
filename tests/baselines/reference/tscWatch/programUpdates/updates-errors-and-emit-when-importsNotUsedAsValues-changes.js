currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/a.ts]
export class C {}

//// [/user/username/projects/myproject/b.ts]
import {C} from './a';
export function f(p: C) { return p; }

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {}
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


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = void 0;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
exports.C = C;


//// [/user/username/projects/myproject/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
function f(p) { return p; }
exports.f = f;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/b.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Set to "remove"

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "importsNotUsedAsValues": "remove"
  }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:32 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/b.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "importsNotUsedAsValues": 0,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Set to "error"

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "importsNotUsedAsValues": "error"
  }
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:43 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m3[0m     "importsNotUsedAsValues": "error"
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:00:50 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
require("./a");
function f(p) { return p; }
exports.f = f;




Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "importsNotUsedAsValues": 2,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Set to "preserve"

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "importsNotUsedAsValues": "preserve"
  }
}


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:54 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m3[0m:[93m5[0m - [91merror[0m[90m TS5101: [0mOption 'importsNotUsedAsValues' is deprecated and will stop functioning in TypeScript 5.5. Specify compilerOption '"ignoreDeprecations": "5.0"' to silence this error.
  Use 'verbatimModuleSyntax' instead.

[7m3[0m     "importsNotUsedAsValues": "preserve"
[7m [0m [91m    ~~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90m12:01:01 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/b.js] file written with same contents


Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "importsNotUsedAsValues": 1,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
