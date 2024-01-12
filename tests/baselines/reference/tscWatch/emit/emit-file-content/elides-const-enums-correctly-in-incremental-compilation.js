currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/user/someone/projects/myproject/file1.ts]
export const enum E1 { V = 1 }

//// [/user/someone/projects/myproject/file2.ts]
import { E1 } from "./file1"; export const enum E2 { V = E1.V }

//// [/user/someone/projects/myproject/file3.ts]
import { E2 } from "./file2"; const v: E2 = E2.V;

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


/a/lib/tsc.js -w /user/someone/projects/myproject/file3.ts
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:30 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/someone/projects/myproject/file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/someone/projects/myproject/file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/someone/projects/myproject/file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v = 1 /* E2.V */;



FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/someone/projects/myproject/file1.ts: *new*
  {}
/user/someone/projects/myproject/file2.ts: *new*
  {}
/user/someone/projects/myproject/file3.ts: *new*
  {}

Program root files: [
  "/user/someone/projects/myproject/file3.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/someone/projects/myproject/file1.ts (used version)
/user/someone/projects/myproject/file2.ts (used version)
/user/someone/projects/myproject/file3.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Append content to file3

Input::
//// [/user/someone/projects/myproject/file3.ts]
import { E2 } from "./file2"; const v: E2 = E2.V;function foo2() { return 2; }


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:37 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/someone/projects/myproject/file3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var v = 1 /* E2.V */;
function foo2() { return 2; }




Program root files: [
  "/user/someone/projects/myproject/file3.ts"
]
Program options: {
  "watch": true
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/someone/projects/myproject/file1.ts
/user/someone/projects/myproject/file2.ts
/user/someone/projects/myproject/file3.ts

Semantic diagnostics in builder refreshed for::
/user/someone/projects/myproject/file3.ts

Shape signatures in builder refreshed for::
/user/someone/projects/myproject/file3.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
