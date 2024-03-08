currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/a.ts]
import test from './b';
test(4, 5);

//// [/user/username/projects/myproject/b.ts]
function test(x: number, y: number) {
    return x + y / 5;
}
export default test;

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

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "noEmit": true,
    "strict": true
  }
}


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.




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
  "module": 1,
  "noEmit": true,
  "strict": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/b.ts (used version)
/user/username/projects/myproject/a.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Changed x type to string

Input::
//// [/user/username/projects/myproject/b.ts]
function test(x: string, y: number) {
    return x + y / 5;
}
export default test;


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:28 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m6[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m2[0m test(4, 5);
[7m [0m [91m     ~[0m

[[90m12:00:29 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "module": 1,
  "noEmit": true,
  "strict": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Changed x type to number

Input::
//// [/user/username/projects/myproject/b.ts]
function test(x: number, y: number) {
    return x + y / 5;
}
export default test;


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "module": 1,
  "noEmit": true,
  "strict": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Changed y type to string

Input::
//// [/user/username/projects/myproject/b.ts]
function test(x: number, y: string) {
    return x + y / 5;
}
export default test;


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:38 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m9[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m2[0m test(4, 5);
[7m [0m [91m        ~[0m

[96mb.ts[0m:[93m2[0m:[93m16[0m - [91merror[0m[90m TS2362: [0mThe left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.

[7m2[0m     return x + y / 5;
[7m [0m [91m               ~[0m

[[90m12:00:39 AM[0m] Found 2 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "module": 1,
  "noEmit": true,
  "strict": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Changed y type to number

Input::
//// [/user/username/projects/myproject/b.ts]
function test(x: number, y: number) {
    return x + y / 5;
}
export default test;


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:44 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:45 AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.ts"
]
Program options: {
  "module": 1,
  "noEmit": true,
  "strict": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/b.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/b.ts (computed .d.ts)
/user/username/projects/myproject/a.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
