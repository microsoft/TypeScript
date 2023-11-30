currentDirectory:: /Users/name/projects/web useCaseSensitiveFileNames: false
Input::
//// [/Users/name/projects/web/package.json]
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [/Users/name/projects/web/index.ts]
import * as me from "@this/package";
me.thing();
export function thing(): void {}


//// [/Users/name/projects/web/tsconfig.json]
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./dist",
    "declarationDir": "./types",
    "composite": true,
    "forceConsistentCasingInFileNames": true,
    "traceResolution": true
  }
}

//// [/a/lib/lib.esnext.full.d.ts]
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


/a/lib/tsc.js -w --explainFiles
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

Found 'package.json' at '/Users/name/projects/web/package.json'.
======== Resolving module '@this/package' from '/Users/name/projects/web/index.ts'. ========
Module resolution kind is not specified, using 'NodeNext'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/Users/name/projects/web/package.json' exists according to earlier cached lookups.
Using 'exports' subpath '.' with target './dist/index.js'.
File '/Users/name/projects/web/index.ts' exists - use it as a name resolution result.
Resolving real path for '/Users/name/projects/web/index.ts', result '/Users/name/projects/web/index.ts'.
======== Module name '@this/package' was successfully resolved to '/Users/name/projects/web/index.ts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
../../../../a/lib/lib.esnext.full.d.ts
  Default library for target 'esnext'
index.ts
  Matched by default include pattern '**/*'
  Imported via "@this/package" from file 'index.ts'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



//// [/Users/name/projects/web/dist/index.js]
import * as me from "@this/package";
me.thing();
export function thing() { }


//// [/Users/name/projects/web/types/index.d.ts]
export declare function thing(): void;


//// [/Users/name/projects/web/dist/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.esnext.full.d.ts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true,"impliedFormat":1},{"version":"14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n","signature":"-2724770439-export declare function thing(): void;\n","impliedFormat":99}],"root":[2],"options":{"composite":true,"declarationDir":"../types","module":199,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[2,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"../types/index.d.ts"},"version":"FakeTSVersion"}

//// [/Users/name/projects/web/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.esnext.full.d.ts",
      "../index.ts"
    ],
    "fileNamesList": [
      [
        "../index.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.esnext.full.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../index.ts": {
        "original": {
          "version": "14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n",
          "signature": "-2724770439-export declare function thing(): void;\n",
          "impliedFormat": 99
        },
        "version": "14361483761-import * as me from \"@this/package\";\nme.thing();\nexport function thing(): void {}\n",
        "signature": "-2724770439-export declare function thing(): void;\n",
        "impliedFormat": "esnext"
      }
    },
    "root": [
      [
        2,
        "../index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declarationDir": "../types",
      "module": 199,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../index.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.esnext.full.d.ts",
      "../index.ts"
    ],
    "latestChangedDtsFile": "../types/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 985
}


PolledWatches::
/Users/name/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/Users/name/projects/web/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/Users/name/projects/web/index.ts: *new*
  {}
/Users/name/projects/web/package.json: *new*
  {}
/Users/name/projects/web/tsconfig.json: *new*
  {}
/a/lib/lib.esnext.full.d.ts: *new*
  {}

FsWatchesRecursive::
/Users/name/projects/web: *new*
  {}

Program root files: [
  "/Users/name/projects/web/index.ts"
]
Program options: {
  "module": 199,
  "outDir": "/Users/name/projects/web/dist",
  "declarationDir": "/Users/name/projects/web/types",
  "composite": true,
  "forceConsistentCasingInFileNames": true,
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/Users/name/projects/web/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.esnext.full.d.ts
/Users/name/projects/web/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.esnext.full.d.ts
/Users/name/projects/web/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.esnext.full.d.ts (used version)
/users/name/projects/web/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined
