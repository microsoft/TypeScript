5:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-16641552193-export const a = \"hello\";"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
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
    "declaration": true
  },
  "checkPending": true,
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
      "version": "-16641552193-export const a = \"hello\";"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
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
    "declaration": true
  },
  "version": "FakeTSVersion"
}
15:: no-change-run
Clean build will have check pending since it didnt type check
Incremental build has typechecked before this so wont have checkPending
TsBuild info text without affectedFilesPendingEmit:: /home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../../tslibs/ts/lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-16641552193-export const a = \"hello\";"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-9150421116-export const c: number = \"hello\";"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "checkPending": true,
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
      "version": "-16641552193-export const a = \"hello\";"
    },
    "./b.ts": {
      "version": "-13368947479-export const b = 10;"
    },
    "./c.ts": {
      "version": "-9150421116-export const c: number = \"hello\";"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./a.ts",
        "./b.ts",
        "./c.ts"
      ]
    ]
  ],
  "options": {
    "declaration": true
  },
  "version": "FakeTSVersion"
}