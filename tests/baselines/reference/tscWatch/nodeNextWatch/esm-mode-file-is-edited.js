currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "target": "es2020",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "outDir": "../dist"
  }
}

//// [/home/src/projects/project/src/index.ts]
import * as Thing from "thing";

Thing.fn();

//// [/home/src/projects/project/src/deps.d.ts]
declare module "thing";

//// [/home/src/projects/project/package.json]
{
  "name": "some-proj",
  "version": "1.0.0",
  "description": "",
  "type": "module",
  "main": "index.js"
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


/home/src/tslibs/TS/Lib/tsc.js --w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m7[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m7[0m     "outDir": "../dist"
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts] *Lib*

//// [/home/src/projects/dist/src/index.js]
import * as Thing from "thing";
Thing.fn();



PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/src/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/project/package.json: *new*
  {}
/home/src/projects/project/src/deps.d.ts: *new*
  {}
/home/src/projects/project/src/index.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}
/home/src/projects/project/src: *new*
  {}

Program root files: [
  "/home/src/projects/project/src/deps.d.ts",
  "/home/src/projects/project/src/index.ts"
]
Program options: {
  "strict": true,
  "target": 7,
  "module": 199,
  "moduleResolution": 99,
  "outDir": "/home/src/projects/dist",
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts
/home/src/projects/project/src/deps.d.ts
/home/src/projects/project/src/index.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2020.full.d.ts (used version)
/home/src/projects/project/src/deps.d.ts (used version)
/home/src/projects/project/src/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Modify typescript file

Input::
//// [/home/src/projects/project/src/index.ts]
import * as Thing from "thing";
Thing.fn();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m7[0m:[93m5[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m7[0m     "outDir": "../dist"
[7m [0m [91m    ~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/dist/src/index.js] file written with same contents


Program root files: [
  "/home/src/projects/project/src/deps.d.ts",
  "/home/src/projects/project/src/index.ts"
]
Program options: {
  "strict": true,
  "target": 7,
  "module": 199,
  "moduleResolution": 99,
  "outDir": "/home/src/projects/dist",
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.es2020.full.d.ts
/home/src/projects/project/src/deps.d.ts
/home/src/projects/project/src/index.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/projects/project/src/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
