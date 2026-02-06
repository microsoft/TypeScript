currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/index.ts]
import settings from './settings.json';

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "resolveJsonModule": true
  },
  "files": [
    "index.ts"
  ]
}

//// [/user/username/projects/myproject/settings.json]
{
  "content": "Print this"
}

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


/home/src/tslibs/TS/Lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/projects/myproject/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/projects/myproject/index.ts: *new*
  {}
/user/username/projects/myproject/settings.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "module": 1,
  "resolveJsonModule": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/settings.json
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/settings.json
/user/username/projects/myproject/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/settings.json (used version)
/user/username/projects/myproject/index.ts (used version)

exitCode:: ExitStatus.undefined
