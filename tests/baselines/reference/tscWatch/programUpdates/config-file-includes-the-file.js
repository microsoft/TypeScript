currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/f1.ts]
export let x = 5

//// [/a/c/f2.ts]
import {x} from "../b/f1"

//// [/a/c/f3.ts]
export let y = 1

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

//// [/a/c/tsconfig.json]
{
  "compilerOptions": {},
  "files": [
    "f2.ts",
    "f3.ts"
  ]
}


/a/lib/tsc.js -w -p /a/c/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 5;


//// [/a/c/f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/a/c/f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;



FsWatches::
/a/b/f1.ts: *new*
  {}
/a/c/f2.ts: *new*
  {}
/a/c/f3.ts: *new*
  {}
/a/c/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Program root files: [
  "/a/c/f2.ts",
  "/a/c/f3.ts"
]
Program options: {
  "watch": true,
  "project": "/a/c/tsconfig.json",
  "configFilePath": "/a/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/c/f2.ts
/a/c/f3.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/f1.ts
/a/c/f2.ts
/a/c/f3.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/f1.ts (used version)
/a/c/f2.ts (used version)
/a/c/f3.ts (used version)

exitCode:: ExitStatus.undefined
