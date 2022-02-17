Input::
//// [/lib/lib.d.ts]
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

//// [/src/projects/project1/class1.d.ts]
declare class class1 {}

//// [/src/projects/project1/class1.ts]


//// [/src/projects/project1/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"exclude":["temp"]}

//// [/src/projects/project2/class2.ts]
class class2 {}

//// [/src/projects/project2/tsconfig.json]
{"compilerOptions":{"module":"none","composite":true},"references":[{"path":"../project1"}]}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success


//// [/src/projects/project2/class2.d.ts]
declare class class2 {
}


//// [/src/projects/project2/class2.js]
var class2 = /** @class */ (function () {
    function class2() {
    }
    return class2;
}());


//// [/src/projects/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","affectsGlobalScope":true}],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/src/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "./class2.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "777969115-class class2 {}",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "module": 0
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 829
}



Change:: Add class3 to project1 and build it
Input::
//// [/src/projects/project1/class3.ts]
class class3 {}



Output::
/lib/tsc -i -p src/projects/project2
[91merror[0m[90m TS6053: [0mFile '/src/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/src/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96msrc/projects/project2/tsconfig.json[0m:[93m1[0m:[93m69[0m
    [7m1[0m {"compilerOptions":{"module":"none","composite":true},"references":[{"path":"../project1"}]}
    [7m [0m [96m                                                                    ~~~~~~~~~~~~~~~~~~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated




Change:: Add output of class3
Input::
//// [/src/projects/project1/class3.d.ts]
declare class class3 {}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success


//// [/src/projects/project2/class2.d.ts] file written with same contents
//// [/src/projects/project2/class2.js] file written with same contents
//// [/src/projects/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2390931783-declare class class2 {\r\n}\r\n","affectsGlobalScope":true}],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "../project1/class3.d.ts": {
        "version": "-3469165364-declare class class3 {}",
        "signature": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "-2390931783-declare class class2 {\r\n}\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "module": 0
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 991
}



Change:: Add excluded file to project1
Input::
//// [/src/projects/project1/temp/file.d.ts]
declare class file {}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success




Change:: Delete output for class3
Input::
//// [/src/projects/project1/class3.d.ts] unlink


Output::
/lib/tsc -i -p src/projects/project2
[91merror[0m[90m TS6053: [0mFile '/src/projects/project1/class3.d.ts' not found.
  The file is in the program because:
    Output from referenced project '/src/projects/project1/tsconfig.json' included because '--module' is specified as 'none'

  [96msrc/projects/project2/tsconfig.json[0m:[93m1[0m:[93m69[0m
    [7m1[0m {"compilerOptions":{"module":"none","composite":true},"references":[{"path":"../project1"}]}
    [7m [0m [96m                                                                    ~~~~~~~~~~~~~~~~~~~~~~[0m
    File is output from referenced project specified here.


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/projects/project2/class2.d.ts] file written with same contents
//// [/src/projects/project2/class2.js] file written with same contents
//// [/src/projects/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../project1/class1.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2390931783-declare class class2 {\r\n}\r\n","affectsGlobalScope":true}],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1]},"version":"FakeTSVersion"}

//// [/src/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "./class2.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "-2390931783-declare class class2 {\r\n}\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "module": 0
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 883
}



Change:: Create output for class3
Input::
//// [/src/projects/project1/class3.d.ts]
declare class class3 {}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success


//// [/src/projects/project2/class2.d.ts] file written with same contents
//// [/src/projects/project2/class2.js] file written with same contents
//// [/src/projects/project2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../project1/class1.d.ts","../project1/class3.d.ts","./class2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-3469237238-declare class class1 {}","affectsGlobalScope":true},{"version":"-3469165364-declare class class3 {}","affectsGlobalScope":true},{"version":"777969115-class class2 {}","signature":"-2390931783-declare class class2 {\r\n}\r\n","affectsGlobalScope":true}],"options":{"composite":true,"module":0},"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/src/projects/project2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../project1/class1.d.ts": {
        "version": "-3469237238-declare class class1 {}",
        "signature": "-3469237238-declare class class1 {}",
        "affectsGlobalScope": true
      },
      "../project1/class3.d.ts": {
        "version": "-3469165364-declare class class3 {}",
        "signature": "-3469165364-declare class class3 {}",
        "affectsGlobalScope": true
      },
      "./class2.ts": {
        "version": "777969115-class class2 {}",
        "signature": "-2390931783-declare class class2 {\r\n}\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "module": 0
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 991
}

