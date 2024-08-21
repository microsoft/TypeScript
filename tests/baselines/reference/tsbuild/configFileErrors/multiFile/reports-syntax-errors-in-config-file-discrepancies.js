0:: reports syntax errors after change to config file
During incremental build, tsbuildinfo is not emitted, so declaration option is not present
Clean build has declaration option in tsbuildinfo
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "4646078106-export function foo() { }"
    },
    "./b.ts": {
      "version": "1045484683-export function bar() { }"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true
  },
  "latestChangedDtsFile": "FakeFileName",
  "errors": true,
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "4646078106-export function foo() { }"
    },
    "./b.ts": {
      "version": "1045484683-export function bar() { }"
    }
  },
  "root": [
    [
      2,
      "./a.ts"
    ],
    [
      3,
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "FakeFileName",
  "errors": true,
  "version": "FakeTSVersion"
}