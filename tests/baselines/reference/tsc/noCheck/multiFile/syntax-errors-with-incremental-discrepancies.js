6:: Introduce error with noCheck
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
    "declaration": true,
    "noCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../lib/lib.d.ts",
      "not cached"
    ],
    [
      "./a.ts",
      "not cached"
    ],
    [
      "./b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
    "declaration": true,
    "noCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
7:: no-change-run
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
    "declaration": true,
    "noCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../lib/lib.d.ts",
      "not cached"
    ],
    [
      "./a.ts",
      "not cached"
    ],
    [
      "./b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
    "declaration": true,
    "noCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
8:: No Change run with checking
*** Needs explanation
TsBuild info text without affectedFilesPendingEmit:: /src/tsconfig.tsbuildinfo.readable.baseline.txt::
CleanBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
  "semanticDiagnosticsPerFile": [
    [
      "../lib/lib.d.ts",
      "not cached"
    ],
    [
      "./a.ts",
      "not cached"
    ],
    [
      "./b.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}
IncrementalBuild:
{
  "fileInfos": {
    "../lib/lib.d.ts": {
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./a.ts": {
      "version": "-14000546910-export const a = \"hello"
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
    "declaration": true,
    "noCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "./a.ts",
      "not cached"
    ]
  ],
  "version": "FakeTSVersion"
}