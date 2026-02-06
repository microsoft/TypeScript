currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/index.tsx]
declare var React: any;
const d = <div />;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "jsx": "preserve"
  }
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mindex.tsx[0m:[93m2[0m:[93m11[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m2[0m const d = <div />;
[7m [0m [91m          ~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*

//// [/user/username/projects/myproject/index.jsx]
"use strict";
const d = <div />;



FsWatches::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts: *new*
  {}
/user/username/projects/myproject/index.tsx: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/index.tsx"
]
Program options: {
  "jsx": 1,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/index.tsx

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2025.full.d.ts (used version)
/user/username/projects/myproject/index.tsx (used version)

exitCode:: ExitStatus.undefined

Change:: Update 'jsx' to 'react'

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{ "compilerOptions": { "jsx": "react" } }


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mindex.tsx[0m:[93m2[0m:[93m11[0m - [91merror[0m[90m TS7026: [0mJSX element implicitly has type 'any' because no interface 'JSX.IntrinsicElements' exists.

[7m2[0m const d = <div />;
[7m [0m [91m          ~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/index.js]
"use strict";
const d = React.createElement("div", null);




Program root files: [
  "/user/username/projects/myproject/index.tsx"
]
Program options: {
  "jsx": 2,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/index.tsx

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
/user/username/projects/myproject/index.tsx

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
