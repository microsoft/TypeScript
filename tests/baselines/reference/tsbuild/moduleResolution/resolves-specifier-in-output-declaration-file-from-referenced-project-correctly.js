Input::
//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{"compilerOptions":{"outDir":"build"},"references":[{"path":"../pkg2"}]}

//// [/user/username/projects/myproject/packages/pkg2/const.ts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from 'const';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"build","baseUrl":"."}}

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js"}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)
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


/a/lib/tsc.js -b packages/pkg1 --verbose --traceResolution
Output::
[[90m12:00:39 AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90m12:00:40 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/const.js' does not exist

[[90m12:00:41 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module 'const' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
'baseUrl' option is set to '/user/username/projects/myproject/packages/pkg2', using this value to resolve non-relative module name 'const'.
Resolving module name 'const' relative to base url '/user/username/projects/myproject/packages/pkg2' - '/user/username/projects/myproject/packages/pkg2/const'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exist - use it as a name resolution result.
======== Module name 'const' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========
[[90m12:00:57 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/index.js' does not exist

[[90m12:00:58 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
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
======== Resolving module 'const' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'NodeJs'.
'baseUrl' option is set to '/user/username/projects/myproject/packages/pkg2', using this value to resolve non-relative module name 'const'.
Resolving module name 'const' relative to base url '/user/username/projects/myproject/packages/pkg2' - '/user/username/projects/myproject/packages/pkg2/const'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.ts' exist - use it as a name resolution result.
======== Module name 'const' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.ts'. ========


Program root files: ["/user/username/projects/myproject/packages/pkg2/const.ts","/user/username/projects/myproject/packages/pkg2/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","baseUrl":"/user/username/projects/myproject/packages/pkg2","traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/const.ts
/user/username/projects/myproject/packages/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/const.ts
/user/username/projects/myproject/packages/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/const.ts (used version)
/user/username/projects/myproject/packages/pkg2/index.ts (used version)

Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/const.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/user/username/projects/myproject/packages/pkg2/build/const.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.ts]
export declare type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from 'const';


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.d.ts","../const.ts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-11202312776-export type TheNum = 42;","-10837689162-export type { TheNum } from 'const';"],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.d.ts",
      "../const.ts",
      "../index.ts"
    ],
    "fileNamesList": [
      [
        "../const.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../const.ts": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-11202312776-export type TheNum = 42;"
      },
      "../index.ts": {
        "version": "-10837689162-export type { TheNum } from 'const';",
        "signature": "-10837689162-export type { TheNum } from 'const';"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../const.ts"
      ]
    },
    "exportedModulesMap": {
      "../index.ts": [
        "../const.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.d.ts",
      "../const.ts",
      "../index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 777
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
exports.__esModule = true;
exports.theNum = void 0;
exports.theNum = 42;


