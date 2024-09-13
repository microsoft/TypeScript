currentDirectory:: /user/username/workspace/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/project/tsconfig.base.json]
{
  "watchOptions": {
    "excludeDirectories": [
      "**/node_modules"
    ]
  }
}

//// [/user/username/workspace/project/tsconfig.A.json]
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "src/a/**/*.ts"
  ],
  "watchOptions": {
    "excludeDirectories": [
      "**/excludes_by_A"
    ]
  }
}

//// [/user/username/workspace/project/src/a/a.ts]
export const a = 10;

//// [/user/username/workspace/project/tsconfig.B.json]
{
  "extends": "./tsconfig.base.json",
  "include": [
    "src/b/**/*.ts"
  ],
  "references": [
    {
      "path": "./tsconfig.A.json"
    }
  ]
}

//// [/user/username/workspace/project/src/b/b.ts]
export const b = 10;

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

//// [/user/username/workspace/project/src/a/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;


//// [/user/username/workspace/project/src/a/a.d.ts]
export declare const a = 10;


//// [/user/username/workspace/project/tsconfig.A.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./src/a/a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14660415448-export const a = 10;","signature":"-3497920574-export declare const a = 10;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./src/a/a.d.ts","version":"FakeTSVersion"}

//// [/user/username/workspace/project/tsconfig.A.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./src/a/a.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./src/a/a.ts": {
      "original": {
        "version": "-14660415448-export const a = 10;",
        "signature": "-3497920574-export declare const a = 10;\n"
      },
      "version": "-14660415448-export const a = 10;",
      "signature": "-3497920574-export declare const a = 10;\n"
    }
  },
  "root": [
    [
      2,
      "./src/a/a.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/a/a.d.ts",
  "version": "FakeTSVersion",
  "size": 780
}


/home/src/tslibs/TS/Lib/tsc.js -w -p tsconfig.B.json --traceResolution --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/workspace/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/workspace/project/tsconfig.B.json 2000 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/workspace/project/src/b/b.ts"]
  options: {"watch":true,"project":"/user/username/workspace/project/tsconfig.B.json","traceResolution":true,"extendedDiagnostics":true,"configFilePath":"/user/username/workspace/project/tsconfig.B.json"}
  projectReferences: [{"path":"/user/username/workspace/project/tsconfig.A.json","originalPath":"./tsconfig.A.json"}]
Loading config file: /user/username/workspace/project/tsconfig.A.json
FileWatcher:: Added:: WatchInfo: /user/username/workspace/project/src/b/b.ts 250 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Source file
ExcludeWatcher:: Added:: WatchInfo: /user/username/workspace/project/node_modules/@types 1 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/node_modules/@types 1 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Type roots
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/project/src/b 1 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/project/src/b 1 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Wild card directory
FileWatcher:: Added:: WatchInfo: /user/username/workspace/project/tsconfig.base.json 2000 {"excludeDirectories":["/user/username/workspace/project/**/node_modules"]} Extended config file
FileWatcher:: Added:: WatchInfo: /user/username/workspace/project/tsconfig.A.json 2000 {"excludeDirectories":["/user/username/workspace/project/**/excludes_by_A"]} Config file of referened project
DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/project/src/a 1 {"excludeDirectories":["/user/username/workspace/project/**/excludes_by_A"]} Wild card directory of referenced project
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/workspace/project/src/a 1 {"excludeDirectories":["/user/username/workspace/project/**/excludes_by_A"]} Wild card directory of referenced project


//// [/user/username/workspace/project/src/b/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/project/src/b/b.ts: *new*
  {}
/user/username/workspace/project/tsconfig.A.json: *new*
  {}
/user/username/workspace/project/tsconfig.B.json: *new*
  {}
/user/username/workspace/project/tsconfig.base.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/project/src/a: *new*
  {}
/user/username/workspace/project/src/b: *new*
  {}

Program root files: [
  "/user/username/workspace/project/src/b/b.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/workspace/project/tsconfig.B.json",
  "traceResolution": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/workspace/project/tsconfig.B.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/project/src/b/b.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/project/src/b/b.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/project/src/b/b.ts (used version)

exitCode:: ExitStatus.undefined
