Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{"compilerOptions":{"outDir":"build","module":"node16"},"references":[{"path":"../pkg2"}]}

//// [/user/username/projects/myproject/packages/pkg2/const.cts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"build","module":"node16"}}

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)
//// [/a/lib/lib.es2022.full.d.ts]
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


/a/lib/tsc.js -b packages/pkg1 -w --verbose --traceResolution
Output::
>> Screen clear
[[90m12:00:41 AM[0m] Starting compilation in watch mode...

[[90m12:00:42 AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90m12:00:43 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/tsconfig.tsbuildinfo' does not exist

[[90m12:00:44 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:01 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/index.js' does not exist

[[90m12:01:02 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
File '/user/username/projects/myproject/packages/pkg2/package.json' exists according to earlier cached lookups.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90m12:01:09 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2022.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/const.cts (computed .d.ts during emit)
/user/username/projects/myproject/packages/pkg2/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2022.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/const.d.cts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2"}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg2/build/const.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.cts]
export declare type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
export {};


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from './const.cjs';


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.es2022.full.d.ts","../const.cts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11202312776-export type TheNum = 42;","signature":"-9649133742-export declare type TheNum = 42;\n","impliedFormat":1},{"version":"-9668872159-export type { TheNum } from './const.cjs';","signature":"-9835135925-export type { TheNum } from './const.cjs';\n","impliedFormat":99}],"options":{"composite":true,"module":100,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./index.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.es2022.full.d.ts",
      "../const.cts",
      "../index.ts"
    ],
    "fileNamesList": [
      [
        "../const.cts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.es2022.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../const.cts": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-9649133742-export declare type TheNum = 42;\n",
        "impliedFormat": "commonjs"
      },
      "../index.ts": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
        "impliedFormat": "esnext"
      }
    },
    "options": {
      "composite": true,
      "module": 100,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../const.cts"
      ]
    },
    "exportedModulesMap": {
      "../index.ts": [
        "../const.cts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.es2022.full.d.ts",
      "../const.cts",
      "../index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1057
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
export const theNum = 42;



Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::
>> Screen clear
[[90m12:01:13 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:14 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/index.js' is older than input 'packages/pkg1/package.json'

[[90m12:01:15 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1471: [0mModule 'pkg2' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90m12:01:16 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2"}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1"}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}


Output::
>> Screen clear
[[90m12:01:20 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:21 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/index.js' is older than input 'packages/pkg1/package.json'

[[90m12:01:22 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:27 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2"}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] file written with same contents

Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::
>> Screen clear
[[90m12:01:31 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:32 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/index.js' is older than input 'packages/pkg1/package.json'

[[90m12:01:33 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m29[0m - [91merror[0m[90m TS1471: [0mModule 'pkg2' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m                            ~~~~~~[0m

[[90m12:01:34 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2"}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1"}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed to cjs extensions

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.cjs","type":"module"}

//// [/user/username/projects/myproject/packages/pkg2/index.cts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/index.ts] deleted

Output::
>> Screen clear
[[90m12:01:42 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:43 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output 'packages/pkg2/build/tsconfig.tsbuildinfo' is older than input 'packages/pkg2/index.cts'

[[90m12:01:44 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:56 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output 'packages/pkg1/build/index.js' is older than input 'packages/pkg2'

[[90m12:01:57 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
File '/user/username/projects/myproject/packages/pkg1/package.json' exists according to earlier cached lookups.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.cjs' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs' has an unsupported extension, so skipping it.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.cts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.cts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.cts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.cts' with Package ID 'pkg2/build/index.d.cts@1.0.0'. ========
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.cts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[[90m12:02:02 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.cts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.cts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts (computed .d.ts)

Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2022.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.cts
/user/username/projects/myproject/packages/pkg2/build/index.d.cts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/index.d.cts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/index.d.cts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/a/lib/package.json:
  {"fileName":"/a/lib/package.json","pollingInterval":250}
/a/package.json:
  {"fileName":"/a/package.json","pollingInterval":250}
/package.json:
  {"fileName":"/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.cts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2"}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1"}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.es2022.full.d.ts","../const.cts","../index.cts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"-11202312776-export type TheNum = 42;","signature":"-9649133742-export declare type TheNum = 42;\n","impliedFormat":1},{"version":"-9668872159-export type { TheNum } from './const.cjs';","signature":"-9835135925-export type { TheNum } from './const.cjs';\n","impliedFormat":1}],"options":{"composite":true,"module":100,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./index.d.cts"},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.es2022.full.d.ts",
      "../const.cts",
      "../index.cts"
    ],
    "fileNamesList": [
      [
        "../const.cts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.es2022.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../const.cts": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-9649133742-export declare type TheNum = 42;\n",
        "impliedFormat": "commonjs"
      },
      "../index.cts": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9835135925-export type { TheNum } from './const.cjs';\n",
        "impliedFormat": "commonjs"
      }
    },
    "options": {
      "composite": true,
      "module": 100,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.cts": [
        "../const.cts"
      ]
    },
    "exportedModulesMap": {
      "../index.cts": [
        "../const.cts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.es2022.full.d.ts",
      "../const.cts",
      "../index.cts"
    ],
    "latestChangedDtsFile": "./index.d.cts"
  },
  "version": "FakeTSVersion",
  "size": 1058
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theNum = void 0;
exports.theNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.cts]
export type { TheNum } from './const.cjs';


