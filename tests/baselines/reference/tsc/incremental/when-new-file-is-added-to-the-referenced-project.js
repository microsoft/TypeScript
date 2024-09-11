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


//// [/home/src/workspaces/projects/project2/class2.js]
var class2 = /** @class */ (function () {
    function class2() {
    }
    return class2;
}());


//// [/home/src/workspaces/projects/project2/class2.d.ts]
declare class class2 {
}


//// [/home/src/workspaces/projects/project2/tsconfig.tsbuildinfo]
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
  "size": 929
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change:: Create output for class3

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
