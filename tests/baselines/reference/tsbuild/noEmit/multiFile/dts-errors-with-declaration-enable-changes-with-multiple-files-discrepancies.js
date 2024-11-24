3:: no-change-run
Clean build will not have declaration and declarationMap
Incremental build will have previous buildInfo so will have dts and declaration and declarationMap
TsBuild info text without affectedFilesPendingEmit:: /home/src/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
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
      "version": "-9502176711-export const a = class { private p = 10; };"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-17233149573-export const c = class { private p = 10; };"
    },
    "./d.ts": {
      "version": "2523684124-export const d = class { private p = 10; };"
    }
  },
  "root": [
    [
      [
        2,
        5
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true,
    "declarationMap": true
  },
  "version": "FakeTSVersion"
}