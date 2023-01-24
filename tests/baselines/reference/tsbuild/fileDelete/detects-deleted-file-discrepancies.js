0:: delete child2 file
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/child/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./child.ts": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      [
        "./child.ts",
        [
          {
            "file": "./child.ts",
            "start": 23,
            "length": 17,
            "messageText": "Cannot find module '../child/child2' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "emitSignatures": [
      "./child.ts"
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
      "./child2.ts": {
        "version": "6507293504-export function child2() {\n}\n"
      },
      "./child.ts": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./child.ts": [
        "./child2.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./child.ts",
      "./child2.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ./child2.ts
Incremental:: {
  "original": {
    "version": "6507293504-export function child2() {\n}\n",
    "signature": "-5501507595-export declare function child2(): void;\n"
  },
  "version": "6507293504-export function child2() {\n}\n",
  "signature": "-5501507595-export declare function child2(): void;\n"
}
Clean:: undefined
Dts Signature:: $undefined