currentDirectory:: /users/username/projects/project useCaseSensitiveFileNames: false
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

//// [/users/username/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}

//// [/users/username/projects/project/file2.ts]
const y: string = 20;


/a/lib/tsc.js -i
Output::
[96mfile2.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m const y: string = 20;
[7m [0m [91m      ~[0m


Found 1 error in file2.ts[90m:1[0m



//// [/users/username/projects/project/file1.js]
var x = 10;


//// [/users/username/projects/project/file2.js]
var y = 20;


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"5029505981-const x = 10;","affectsGlobalScope":true},{"version":"2414573776-const y: string = 20;","affectsGlobalScope":true}],"root":[2,3],"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,[3,[{"file":"./file2.ts","start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./file1.ts": {
        "original": {
          "version": "5029505981-const x = 10;",
          "affectsGlobalScope": true
        },
        "version": "5029505981-const x = 10;",
        "signature": "5029505981-const x = 10;",
        "affectsGlobalScope": true
      },
      "./file2.ts": {
        "original": {
          "version": "2414573776-const y: string = 20;",
          "affectsGlobalScope": true
        },
        "version": "2414573776-const y: string = 20;",
        "signature": "2414573776-const y: string = 20;",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./file1.ts"
      ],
      [
        3,
        "./file2.ts"
      ]
    ],
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      [
        "./file2.ts",
        [
          {
            "file": "./file2.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'number' is not assignable to type 'string'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 890
}


Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/file1.ts (used version)
/users/username/projects/project/file2.ts (used version)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

Change::

Input::
//// [/users/username/projects/project/file1.ts]
const z = 10;


Output::
[96mfile2.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m const y: string = 20;
[7m [0m [91m      ~[0m


Found 1 error in file2.ts[90m:1[0m



//// [/users/username/projects/project/file1.js]
var z = 10;


//// [/users/username/projects/project/file2.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./file1.ts","./file2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"3317474623-const z = 10;","signature":"-368931399-declare const z = 10;\n","affectsGlobalScope":true},{"version":"2414573776-const y: string = 20;","signature":"509180395-declare const y: string;\n","affectsGlobalScope":true}],"root":[2,3],"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,[3,[{"file":"./file2.ts","start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]]]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      "./file2.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./file1.ts": {
        "original": {
          "version": "3317474623-const z = 10;",
          "signature": "-368931399-declare const z = 10;\n",
          "affectsGlobalScope": true
        },
        "version": "3317474623-const z = 10;",
        "signature": "-368931399-declare const z = 10;\n",
        "affectsGlobalScope": true
      },
      "./file2.ts": {
        "original": {
          "version": "2414573776-const y: string = 20;",
          "signature": "509180395-declare const y: string;\n",
          "affectsGlobalScope": true
        },
        "version": "2414573776-const y: string = 20;",
        "signature": "509180395-declare const y: string;\n",
        "affectsGlobalScope": true
      }
    },
    "root": [
      [
        2,
        "./file1.ts"
      ],
      [
        3,
        "./file2.ts"
      ]
    ],
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./file1.ts",
      [
        "./file2.ts",
        [
          {
            "file": "./file2.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'number' is not assignable to type 'string'."
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 990
}


Program root files: [
  "/users/username/projects/project/file1.ts",
  "/users/username/projects/project/file2.ts"
]
Program options: {
  "incremental": true,
  "configFilePath": "/users/username/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/file1.ts
/users/username/projects/project/file2.ts

Shape signatures in builder refreshed for::
/users/username/projects/project/file1.ts (computed .d.ts)
/users/username/projects/project/file2.ts (computed .d.ts)

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
