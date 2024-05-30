0:: delete child2 file
Clean build will not have latestChangedDtsFile as there was no emit and emitSignatures as undefined for files
Incremental will store the past latestChangedDtsFile and emitSignatures
TsBuild info text without affectedFilesPendingEmit:: /src/child/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./child.ts": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./child.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "semanticDiagnosticsPerFile": [
      [
        "./child.ts",
        [
          {
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
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "./child.ts": {
        "version": "-11458139532-import { child2 } from \"../child/child2\";\nexport function child() {\n    child2();\n}\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "./child.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "semanticDiagnosticsPerFile": [
      [
        "./child.ts",
        [
          {
            "start": 23,
            "length": 17,
            "messageText": "Cannot find module '../child/child2' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}