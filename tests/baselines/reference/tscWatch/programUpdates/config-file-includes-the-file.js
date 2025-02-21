currentDirectory:: /user/username/workspace/solution/projects useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/f1.ts]
export let x = 5

//// [/user/username/workspace/solution/projects/projectc/f2.ts]
import {x} from "../project/f1"

//// [/user/username/workspace/solution/projects/projectc/f3.ts]
export let y = 1

//// [/user/username/workspace/solution/projects/projectc/tsconfig.json]
{
  "compilerOptions": {},
  "files": [
    "f2.ts",
    "f3.ts"
  ]
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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/projects/projectc/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 5;


//// [/user/username/workspace/solution/projects/projectc/f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/workspace/solution/projects/projectc/f3.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/projectc/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/projectc/f2.ts: *new*
  {}
/user/username/workspace/solution/projects/projectc/f3.ts: *new*
  {}
/user/username/workspace/solution/projects/projectc/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/projectc/f2.ts",
  "/user/username/workspace/solution/projects/projectc/f3.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/workspace/solution/projects/projectc/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/projectc/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f1.ts
/user/username/workspace/solution/projects/projectc/f2.ts
/user/username/workspace/solution/projects/projectc/f3.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/f1.ts
/user/username/workspace/solution/projects/projectc/f2.ts
/user/username/workspace/solution/projects/projectc/f3.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/f1.ts (used version)
/user/username/workspace/solution/projects/projectc/f2.ts (used version)
/user/username/workspace/solution/projects/projectc/f3.ts (used version)

exitCode:: ExitStatus.undefined
