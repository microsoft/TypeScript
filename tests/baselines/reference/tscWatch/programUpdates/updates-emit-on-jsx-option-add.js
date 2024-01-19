currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/index.tsx]
declare var React: any;
const d = <div />;

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
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[96mindex.tsx[0m:[93m2[0m:[93m11[0m - [91merror[0m[90m TS17004: [0mCannot use JSX unless the '--jsx' flag is provided.

[7m2[0m const d = <div />;
[7m [0m [91m          ~~~~~~~[0m

[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/index.js]
var d = <div />;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
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
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.tsx

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/index.tsx (used version)

exitCode:: ExitStatus.undefined

Change:: Update 'jsx' to 'preserve'

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{ "compilerOptions": { "jsx": "preserve" } }


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:31 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/index.jsx]
var d = <div />;




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
/a/lib/lib.d.ts
/user/username/projects/myproject/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.tsx

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
