Input::
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

//// [/users/username/projects/project/file1.ts]
const x = 10;

//// [/users/username/projects/project/file2.ts]
const y = 20;

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"incremental":true}}


/a/lib/tsc.js -i
Output::


Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/file2.ts"]
Program options: {"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/users/username/projects/project/file1.js]
var x = 10;


//// [/users/username/projects/project/file2.js]
var y = 20;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./file1.ts": {
        "version": "5029505981-const x = 10;",
        "signature": "-4001438729-declare const x = 10;\n",
        "affectsGlobalScope": true
      },
      "./file2.ts": {
        "version": "2026007743-const y = 20;",
        "signature": "-4332632775-declare const y = 20;\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ]
  },
  "version": "FakeTSVersion"
}


Change::

Input::
//// [/users/username/projects/project/file2.ts]
const z = 10;


Output::


Program root files: ["/users/username/projects/project/file1.ts","/users/username/projects/project/file2.ts"]
Program options: {"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/users/username/projects/project/file1.js] file written with same contents
//// [/users/username/projects/project/file2.js]
var z = 10;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{
  "program": {
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./file1.ts": {
        "version": "5029505981-const x = 10;",
        "signature": "-4001438729-declare const x = 10;\n",
        "affectsGlobalScope": true
      },
      "./file2.ts": {
        "version": "3317474623-const z = 10;",
        "signature": "-368931399-declare const z = 10;\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "incremental": true,
      "configFilePath": "./tsconfig.json"
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ]
  },
  "version": "FakeTSVersion"
}

