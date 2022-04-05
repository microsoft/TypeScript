0:: Modify imports used in global file
*** Needs explaination
File: /src/project/class1.d.ts
CleanBuild:
declare const a = 2;

IncrementalBuild:
declare const a = 1;

TsBuild info text without affectedFilesPendingEmit:: /src/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./class1.ts": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "affectsGlobalScope": true
      },
      "./constants.ts": {
        "version": "-2659799015-export default 2;"
      },
      "./types.d.ts": {
        "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./types.d.ts": [
        "./constants.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./class1.ts",
        [
          {
            "file": "./class1.ts",
            "start": 6,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type '1' is not assignable to type '2'."
          }
        ]
      ],
      "./constants.ts",
      "./types.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./class1.ts": {
        "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
        "affectsGlobalScope": true
      },
      "./constants.ts": {
        "version": "-2659799015-export default 2;"
      },
      "./types.d.ts": {
        "version": "-2080821236-type MagicNumber = typeof import('./constants').default",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./types.d.ts": [
        "./constants.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./class1.ts",
      "./constants.ts",
      "./types.d.ts"
    ]
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ./class1.ts
Incremental:: {
  "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
  "signature": "-4973073251-declare const a = 1;\r\n",
  "affectsGlobalScope": true
}
Clean:: {
  "version": "4085502068-const a: MagicNumber = 1;\nconsole.log(a);",
  "signature": "-4973037314-declare const a = 2;\r\n",
  "affectsGlobalScope": true
}