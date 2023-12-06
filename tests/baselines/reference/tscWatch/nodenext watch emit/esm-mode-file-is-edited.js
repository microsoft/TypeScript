currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/project/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "target": "es2020",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "outDir": "../dist"
  }
}

//// [/project/src/index.ts]
import * as Thing from "thing";

Thing.fn();

//// [/project/src/deps.d.ts]
declare module "thing";

//// [/project/package.json]
{
  "name": "some-proj",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js"
}

//// [/a/lib/lib.es2020.full.d.ts]
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


/a/lib/tsc.js --w --p /project/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:27 AM[0m] Found 0 errors. Watching for file changes.



//// [/dist/index.js]
import * as Thing from "thing";
Thing.fn();



FsWatches::
/a/lib/lib.es2020.full.d.ts: *new*
  {}
/project/src/deps.d.ts: *new*
  {}
/project/src/index.ts: *new*
  {}
/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/project: *new*
  {}

Program root files: [
  "/project/src/deps.d.ts",
  "/project/src/index.ts"
]
Program options: {
  "strict": true,
  "target": 7,
  "module": 199,
  "moduleResolution": 99,
  "outDir": "/dist",
  "watch": true,
  "project": "/project/tsconfig.json",
  "configFilePath": "/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2020.full.d.ts (used version)
/project/src/deps.d.ts (used version)
/project/src/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify typescript file

Input::
//// [/project/src/index.ts]
import * as Thing from "thing";
Thing.fn();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



//// [/dist/index.js] file written with same contents


Program root files: [
  "/project/src/deps.d.ts",
  "/project/src/index.ts"
]
Program options: {
  "strict": true,
  "target": 7,
  "module": 199,
  "moduleResolution": 99,
  "outDir": "/dist",
  "watch": true,
  "project": "/project/tsconfig.json",
  "configFilePath": "/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.es2020.full.d.ts
/project/src/deps.d.ts
/project/src/index.ts

Semantic diagnostics in builder refreshed for::
/project/src/index.ts

Shape signatures in builder refreshed for::
/project/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
