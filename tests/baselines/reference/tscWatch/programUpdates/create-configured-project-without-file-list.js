currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]

                {
                    "compilerOptions": {},
                    "exclude": [
                        "e"
                    ]
                }

//// [/user/username/workspace/solution/projects/project/c/f1.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/d/f2.ts]
let y = 1

//// [/user/username/workspace/solution/projects/project/e/f3.ts]
let z = 1

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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/workspace/solution/projects/project/c/f1.js]
"use strict";
let x = 1;


//// [/user/username/workspace/solution/projects/project/d/f2.js]
"use strict";
let y = 1;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/c/f1.ts: *new*
  {}
/user/username/workspace/solution/projects/project/d/f2.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/c/f1.ts",
  "/user/username/workspace/solution/projects/project/d/f2.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/c/f1.ts
/user/username/workspace/solution/projects/project/d/f2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/workspace/solution/projects/project/c/f1.ts
/user/username/workspace/solution/projects/project/d/f2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/workspace/solution/projects/project/c/f1.ts (used version)
/user/username/workspace/solution/projects/project/d/f2.ts (used version)

exitCode:: ExitStatus.undefined
