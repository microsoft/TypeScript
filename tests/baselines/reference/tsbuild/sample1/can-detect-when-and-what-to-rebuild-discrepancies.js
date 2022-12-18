2:: rebuilds when tsconfig changes
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tests/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "program": {
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "3708260210-const m = 10;",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts"
    ],
    "changeFileSet": [
      "./index.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
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
      "./index.ts": {
        "version": "3708260210-const m = 10;",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "latestChangedDtsFile": "FakeFileName"
  },
  "version": "FakeTSVersion"
}
Incremental signature is neither dts signature nor file version for File:: ./index.ts
Incremental:: {
  "original": {
    "version": "3708260210-const m = 10;",
    "signature": "1073907769-declare const m = 10;\r\n",
    "affectsGlobalScope": true
  },
  "version": "3708260210-const m = 10;",
  "signature": "1073907769-declare const m = 10;\r\n",
  "affectsGlobalScope": true
}
Clean:: {
  "original": {
    "version": "3708260210-const m = 10;",
    "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
    "affectsGlobalScope": true
  },
  "version": "3708260210-const m = 10;",
  "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
  "affectsGlobalScope": true
}
Dts Signature:: $undefined
Incremental Reference set is neither from dts nor files reference map for File:: ./index.ts::
Incremental:: undefined
Clean:: [
  "../core/anothermodule.d.ts"
]
DtsExportsMap:: undefined
Incremental build contains affectedFilesPendingEmit, clean build does not have it: /src/tests/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "3708260210-const m = 10;",
          "signature": "1073907769-declare const m = 10;\r\n",
          "affectsGlobalScope": true
        },
        "version": "3708260210-const m = 10;",
        "signature": "1073907769-declare const m = 10;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./index.ts",
        "Js | Dts"
      ]
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 929
}
Clean buildInfoText:: {
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts",
      "../core/anothermodule.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "3708260210-const m = 10;",
          "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
          "affectsGlobalScope": true
        },
        "version": "3708260210-const m = 10;",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts"
    ],
    "changeFileSet": [
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1031
}
Incremental build contains ./index.ts file as pending emit, clean build does not have it: /src/tests/tsconfig.tsbuildinfo.readable.baseline.txt::
Incremental buildInfoText:: {
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "3708260210-const m = 10;",
          "signature": "1073907769-declare const m = 10;\r\n",
          "affectsGlobalScope": true
        },
        "version": "3708260210-const m = 10;",
        "signature": "1073907769-declare const m = 10;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "./index.ts",
        "Js | Dts"
      ]
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 929
}
Clean buildInfoText:: {
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts",
      "../core/anothermodule.d.ts"
    ],
    "fileNamesList": [
      [
        "../core/anothermodule.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "original": {
          "version": "3708260210-const m = 10;",
          "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
          "affectsGlobalScope": true
        },
        "version": "3708260210-const m = 10;",
        "signature": "-9209611-import * as mod from '../core/anotherModule';\r\nexport declare const m: typeof mod;\r\n",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "declaration": true,
      "skipDefaultLibCheck": true,
      "target": 0
    },
    "referencedMap": {},
    "exportedModulesMap": {
      "./index.ts": [
        "../core/anothermodule.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts"
    ],
    "changeFileSet": [
      "./index.ts"
    ],
    "latestChangedDtsFile": "./index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1031
}