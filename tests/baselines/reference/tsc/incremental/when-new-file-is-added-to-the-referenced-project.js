currentDirectory:: /home/src/workspaces/projects useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/projects/project1/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  },
  "exclude": [
    "temp"
  ]
}

//// [/home/src/workspaces/projects/project1/class1.ts]
class class1 {}

//// [/home/src/workspaces/projects/project1/class1.d.ts]
declare class class1 {}

//// [/home/src/workspaces/projects/project2/tsconfig.json]
{
  "compilerOptions": {
    "module": "none",
    "composite": true
  },
  "references": [
    {
      "path": "../project1"
    }
  ]
}

//// [/home/src/workspaces/projects/project2/class2.ts]
class class2 {}

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


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 1 error in project2/tsconfig.json[90m:3[0m



//// [/home/src/workspaces/projects/project2/class2.js]
class class2 {
}


//// [/home/src/workspaces/projects/project2/class2.d.ts]
declare class class2 {
}


//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 894
}


exitCode:: ExitStatus.Success

Change:: Add class3 to project1 and build it

Input::
//// [/home/src/workspaces/projects/project1/class3.ts]
class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.



//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 908
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add output of class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts]
declare class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::


//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "../project1/class3.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "../project1/class3.d.ts": {
      "original": {
        "version": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469165364-declare class class3 {}",
      "signature": "-3469165364-declare class class3 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      4,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 996
}


exitCode:: ExitStatus.Success

Change:: Add excluded file to project1

Input::
//// [/home/src/workspaces/projects/project1/temp/file.d.ts]
declare class file {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::



exitCode:: ExitStatus.Success

Change:: Delete output for class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.



//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[2,3],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 854
}


exitCode:: ExitStatus.Success

Change:: Add class3 to project1 and build it

Input::
//// [/home/src/workspaces/projects/project1/class3.ts]
class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.



//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "errors": true,
  "version": "FakeTSVersion",
  "size": 868
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add output of class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts]
declare class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::


//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "../project1/class3.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "../project1/class3.d.ts": {
      "original": {
        "version": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469165364-declare class class3 {}",
      "signature": "-3469165364-declare class class3 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      4,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 956
}


exitCode:: ExitStatus.Success

Change:: Add excluded file to project1

Input::
//// [/home/src/workspaces/projects/project1/temp/file.d.ts]
declare class file {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::



exitCode:: ExitStatus.Success

Change:: Delete output for class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.



//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[2,3],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
=======
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class1.d.ts",
      "not cached or not changed"
    ],
    [
      "./class2.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 929
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 889
=======
  "size": 891
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add class3 to project1 and build it

Input::
//// [/home/src/workspaces/projects/project1/class3.ts]
class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.

[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 2 errors in the same file, starting at: project2/tsconfig.json[90m:3[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add output of class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts]
declare class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 1 error in project2/tsconfig.json[90m:3[0m



//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
<<<<<<< HEAD
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
=======
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "../project1/class3.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "../project1/class3.d.ts": {
      "original": {
        "version": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469165364-declare class class3 {}",
      "signature": "-3469165364-declare class class3 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      4,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class1.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class3.d.ts",
      "not cached or not changed"
    ],
    [
      "./class2.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
<<<<<<< HEAD
  "size": 996
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
  "size": 956
=======
  "size": 995
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Add excluded file to project1

Input::
//// [/home/src/workspaces/projects/project1/temp/file.d.ts]
declare class file {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 1 error in project2/tsconfig.json[90m:3[0m




exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Delete output for class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts] deleted

/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[91merror[0m[90m TS6053: [0mFile '/home/src/workspaces/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/home/src/workspaces/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96mproject2/tsconfig.json[0m:[93m7[0m:[93m5[0m
    [7m7[0m     {
    [7m [0m [96m    ~[0m
    [7m8[0m       "path": "../project1"
    [7m [0m [96m~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m
    [7m9[0m     }
    [7m [0m [96m~~~~~[0m
    File is output from referenced project specified here.

[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 2 errors in the same file, starting at: project2/tsconfig.json[90m:3[0m



//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[3],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      3,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class1.d.ts",
      "not cached or not changed"
    ],
    [
      "./class2.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 891
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Create output for class3

Input::
//// [/home/src/workspaces/projects/project1/class3.d.ts]
declare class class3 {}


/home/src/tslibs/TS/Lib/tsc.js -i -p project2
Output::
[96mproject2/tsconfig.json[0m:[93m3[0m:[93m15[0m - [91merror[0m[90m TS5107: [0mOption 'module=None' is deprecated and will stop functioning in TypeScript 7.0. Specify compilerOption '"ignoreDeprecations": "6.0"' to silence this error.

[7m3[0m     "module": "none",
[7m [0m [91m              ~~~~~~[0m


Found 1 error in project2/tsconfig.json[90m:3[0m



//// [/home/src/workspaces/projects/project2/class2.js] file written with same contents
//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2684084705-declare class class2 {\n}\n","affectsGlobalScope":true}],"root":[4],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3,4],"latestChangedDtsFile":"./class2.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../project1/class1.d.ts",
    "../project1/class3.d.ts",
    "./class2.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "-25093698414-interface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../project1/class1.d.ts": {
      "original": {
        "version": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469237238-declare class class1 {}",
      "signature": "-3469237238-declare class class1 {}",
      "affectsGlobalScope": true
    },
    "../project1/class3.d.ts": {
      "original": {
        "version": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "version": "-3469165364-declare class class3 {}",
      "signature": "-3469165364-declare class class3 {}",
      "affectsGlobalScope": true
    },
    "./class2.ts": {
      "original": {
        "version": "777969115-class class2 {}",
        "signature": "-2684084705-declare class class2 {\n}\n",
        "affectsGlobalScope": true
      },
      "version": "777969115-class class2 {}",
      "signature": "-2684084705-declare class class2 {\n}\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      4,
      "./class2.ts"
    ]
  ],
  "options": {
    "composite": true,
    "module": 0
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../../tslibs/ts/lib/lib.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class1.d.ts",
      "not cached or not changed"
    ],
    [
      "../project1/class3.d.ts",
      "not cached or not changed"
    ],
    [
      "./class2.ts",
      "not cached or not changed"
    ]
  ],
  "latestChangedDtsFile": "./class2.d.ts",
  "version": "FakeTSVersion",
  "size": 995
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
