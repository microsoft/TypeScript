0:: build ts project with edit
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /users/username/projects/replay/axios-src/test/module/ts/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../../../../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14419396410-export const y = 10;\nexport const z = 10;"
      },
      "./node_modules/@types/node/index.d.ts": {
        "version": "-7116520553-declare const tsGlobal = 10;\n",
        "affectsGlobalScope": true
      },
      "../../../node_modules/@types/responselike/index.d.ts": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "referencedMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "../ts-require/node_modules/@types/node/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../../lib/lib.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts"
    ],
    "options": {}
  },
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "program": {
    "fileInfos": {
      "../../../../../../../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14419396410-export const y = 10;\nexport const z = 10;"
      },
      "./node_modules/@types/node/index.d.ts": {
        "version": "-7116520553-declare const tsGlobal = 10;\n",
        "affectsGlobalScope": true
      },
      "../../../node_modules/@types/responselike/index.d.ts": {
        "version": "4670743798-/// <reference types=\"node\" />\nexport const z = 10;\n"
      }
    },
    "root": [
      [
        2,
        "./index.ts"
      ]
    ],
    "referencedMap": {
      "../../../node_modules/@types/responselike/index.d.ts": [
        "./node_modules/@types/node/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../../lib/lib.d.ts",
      "../../../node_modules/@types/responselike/index.d.ts",
      "./index.ts",
      "./node_modules/@types/node/index.d.ts"
    ],
    "options": {}
  },
  "version": "FakeTSVersion"
}