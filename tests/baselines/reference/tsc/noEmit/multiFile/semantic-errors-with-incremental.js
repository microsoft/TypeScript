currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/src/projects/project/a.ts]
const a: number = "hello"

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "incremental": true
  }
}

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



Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/home/src/projects/project/a.ts (used version)


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1311033573-const a: number = \"hello\"","affectsGlobalScope":true}],"root":[2],"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "1311033573-const a: number = \"hello\"",
        "affectsGlobalScope": true
      },
      "version": "1311033573-const a: number = \"hello\"",
      "signature": "1311033573-const a: number = \"hello\"",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 842
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Fix error
Input::
//// [/home/src/projects/project/a.ts]
const a = "hello";



Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/a.ts (computed .d.ts)


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3528887741-const a = \"hello\";","signature":"-5460434953-declare const a = \"hello\";\n","affectsGlobalScope":true}],"root":[2],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "3528887741-const a = \"hello\";",
        "signature": "-5460434953-declare const a = \"hello\";\n",
        "affectsGlobalScope": true
      },
      "version": "3528887741-const a = \"hello\";",
      "signature": "-5460434953-declare const a = \"hello\";\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 741
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Emit after fixing error
Input::


Output::
/lib/tsc -p /home/src/projects/project
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/project/a.js]
var a = "hello";


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"3528887741-const a = \"hello\";","signature":"-5460434953-declare const a = \"hello\";\n","affectsGlobalScope":true}],"root":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "3528887741-const a = \"hello\";",
        "signature": "-5460434953-declare const a = \"hello\";\n",
        "affectsGlobalScope": true
      },
      "version": "3528887741-const a = \"hello\";",
      "signature": "-5460434953-declare const a = \"hello\";\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 710
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
exitCode:: ExitStatus.Success
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::




Change:: Introduce error
Input::
//// [/home/src/projects/project/a.ts]
const a: number = "hello"



Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Shape signatures in builder refreshed for::
/home/src/projects/project/a.ts (computed .d.ts)


//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1311033573-const a: number = \"hello\"","signature":"1093425381-declare const a: number;\n","affectsGlobalScope":true}],"root":[2],"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"affectedFilesPendingEmit":[2],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "1311033573-const a: number = \"hello\"",
        "signature": "1093425381-declare const a: number;\n",
        "affectsGlobalScope": true
      },
      "version": "1311033573-const a: number = \"hello\"",
      "signature": "1093425381-declare const a: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./a.ts",
      "Js"
    ]
  ],
  "version": "FakeTSVersion",
  "size": 894
}



Change:: Emit when error
Input::


Output::
/lib/tsc -p /home/src/projects/project
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


//// [/home/src/projects/project/a.js] file written with same contents
//// [/home/src/projects/project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"1311033573-const a: number = \"hello\"","signature":"1093425381-declare const a: number;\n","affectsGlobalScope":true}],"root":[2],"semanticDiagnosticsPerFile":[[2,[{"start":6,"length":1,"code":2322,"category":1,"messageText":"Type 'string' is not assignable to type 'number'."}]]],"version":"FakeTSVersion"}

//// [/home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "./a.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "original": {
        "version": "1311033573-const a: number = \"hello\"",
        "signature": "1093425381-declare const a: number;\n",
        "affectsGlobalScope": true
      },
      "version": "1311033573-const a: number = \"hello\"",
      "signature": "1093425381-declare const a: number;\n",
      "affectsGlobalScope": true
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ]
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      [
        {
          "start": 6,
          "length": 1,
          "code": 2322,
          "category": 1,
          "messageText": "Type 'string' is not assignable to type 'number'."
        }
      ]
    ]
  ],
  "version": "FakeTSVersion",
  "size": 863
}



Change:: no-change-run
Input::


Output::
/lib/tsc -p /home/src/projects/project --noEmit
[96mhome/src/projects/project/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const a: number = "hello"
[7m [0m [91m      ~[0m


Found 1 error in home/src/projects/project/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/home/src/projects/project/a.ts"
]
Program options: {
  "incremental": true,
  "project": "/home/src/projects/project",
  "noEmit": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/home/src/projects/project/a.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::


