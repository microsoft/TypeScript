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
{
  "program": {
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
      "module": 0,
      "composite": true,
      "incremental": true,
      "project": "./",
      "configFilePath": "./tsconfig.json"
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion"
}



Change:: Add class3 to project1 and build it
Input::
//// [/src/projects/project1/class3.d.ts]
declare class class3 {}

//// [/src/projects/project1/class3.ts]
class class3 {}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success


//// [/src/projects/project2/class2.d.ts] file written with same contents
//// [/src/projects/project2/class2.js] file written with same contents
//// [/src/projects/project2/tsconfig.tsbuildinfo]
{
  "program": {
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
      "module": 0,
      "composite": true,
      "incremental": true,
      "project": "./",
      "configFilePath": "./tsconfig.json"
    },
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../project1/class1.d.ts",
      "../project1/class3.d.ts",
      "./class2.ts"
    ]
  },
  "version": "FakeTSVersion"
}



Change:: Add excluded file to project1
Input::
//// [/src/projects/project1/temp/file.d.ts]
declare class file {}



Output::
/lib/tsc -i -p src/projects/project2
exitCode:: ExitStatus.Success


