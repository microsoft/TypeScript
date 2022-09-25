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

//// [/src/project/class1.ts]
export class class1 {}

//// [/src/project/tsconfig.json]
{"compilerOptions":{"incremental":true,"strict":true}}



Output::
/lib/tsc -noEmit -p src/project
exitCode:: ExitStatus.Success
Program root files: ["/src/project/class1.ts"]
Program options: {"incremental":true,"strict":true,"noEmit":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/class1.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/project/class1.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/project/class1.ts (used version)


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./class1.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-7660182596-export class class1 {}"],"options":{"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"affectedFilesPendingEmit":[[2,1]]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./class1.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./class1.ts": {
        "version": "-7660182596-export class class1 {}",
        "signature": "-7660182596-export class class1 {}"
      }
    },
    "options": {
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./class1.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./class1.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 757
}



Change:: no-change-run
Input::


Output::
/lib/tsc -noEmit -p src/project
exitCode:: ExitStatus.Success
Program root files: ["/src/project/class1.ts"]
Program options: {"incremental":true,"strict":true,"noEmit":true,"project":"/src/project","configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/class1.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


